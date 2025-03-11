"use client"

import { useEffect, useState } from "react"
import { analyzeSentiment } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SentimentChart from "@/components/sentiment-chart"
import SkeetList from "@/components/skeet-list"
import DownloadButton from "@/components/download-button"
import type { SentimentData } from "@/lib/types"
import { motion } from "framer-motion"

export default function SentimentResults({ query }: { query: string }) {
  const [data, setData] = useState<SentimentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!query) return

      setLoading(true)
      try {
        const result = await analyzeSentiment(query)
        setData(result)
      } catch (error) {
        console.error("Failed to fetch sentiment data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return <div>No data found for &quot;{query}&quot;</div>
  }

  const { summary, skeets } = data

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold">Analysis Summary</h2>
        {data && <DownloadButton data={data} query={query} />}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <SentimentCard
          title="Positive"
          value={summary.positive}
          total={summary.total}
          color="text-[hsl(var(--positive))]"
        />
        <SentimentCard
          title="Neutral"
          value={summary.neutral}
          total={summary.total}
          color="text-[hsl(var(--neutral))]"
        />
        <SentimentCard
          title="Negative"
          value={summary.negative}
          total={summary.total}
          color="text-[hsl(var(--negative))]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="font-extrabold">Sentiment Distribution</CardTitle>
            <CardDescription>Visual breakdown of sentiment for &quot;{query}&quot;</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <SentimentChart data={summary} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold">Skeet Analysis</h2>
            <TabsList>
              <TabsTrigger value="all" className="font-bold">
                All
              </TabsTrigger>
              <TabsTrigger value="positive" className="font-bold">
                Positive
              </TabsTrigger>
              <TabsTrigger value="neutral" className="font-bold">
                Neutral
              </TabsTrigger>
              <TabsTrigger value="negative" className="font-bold">
                Negative
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <SkeetList skeets={skeets} />
          </TabsContent>

          <TabsContent value="positive">
            <SkeetList skeets={skeets.filter((skeet) => skeet.sentiment === "positive")} />
          </TabsContent>

          <TabsContent value="neutral">
            <SkeetList skeets={skeets.filter((skeet) => skeet.sentiment === "neutral")} />
          </TabsContent>

          <TabsContent value="negative">
            <SkeetList skeets={skeets.filter((skeet) => skeet.sentiment === "negative")} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function SentimentCard({
  title,
  value,
  total,
  color,
}: {
  title: string
  value: number
  total: number
  color: string
}) {
  const percentage = Math.round((value / total) * 100)

  return (
    <Card className="border-2 card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-extrabold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className={`text-4xl font-extrabold ${color}`}>{percentage}%</span>
          <Badge variant="outline">{value} skeets</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

