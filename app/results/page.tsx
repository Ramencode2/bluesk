"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import SentimentResults from "@/components/sentiment-results"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 max-w-6xl"
    >
      <div className="mb-8">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/search">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Sentiment Analysis for &quot;{query}&quot;</h1>
          <p className="text-muted-foreground">Analyzing skeets to understand public sentiment</p>
        </motion.div>
      </div>

      <Suspense fallback={<ResultsSkeleton />}>
        <SentimentResults query={query} />
      </Suspense>
    </motion.main>
  )
}

function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
      <Skeleton className="h-[300px] w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
        </div>
      </div>
    </div>
  )
}

