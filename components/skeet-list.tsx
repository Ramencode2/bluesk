"use client"

import type { Tweet } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsDown, ThumbsUp, Minus } from "lucide-react"
import { motion } from "framer-motion"

export default function SkeetList({ skeets }: { skeets: Tweet[] }) {
  if (skeets.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">No skeets found in this category</p>
  }

  return (
    <div className="space-y-4">
      {skeets.map((skeet, index) => (
        <motion.div
          key={skeet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Card key={skeet.id} className="overflow-hidden border-2 card-hover">
            <CardContent className="p-0">
              <div className="flex items-start p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold">@{skeet.username}</span>
                    <span className="text-sm text-muted-foreground">{new Date(skeet.date).toLocaleDateString()}</span>
                  </div>
                  <p>{skeet.text}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>{skeet.likes} likes</span>
                    <span>•</span>
                    <span>{skeet.retweets} reposts</span>
                  </div>
                </div>
                <div className="ml-4">
                  <SentimentIcon sentiment={skeet.sentiment} score={skeet.score} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function SentimentIcon({
  sentiment,
  score,
}: {
  sentiment: string
  score: number
}) {
  const scoreFormatted = Math.abs(score).toFixed(2)

  if (sentiment === "positive") {
    return (
      <div className="flex flex-col items-center text-[hsl(var(--positive))]" title={`Positive: ${scoreFormatted}`}>
        <ThumbsUp className="h-6 w-6" />
        <span className="text-xs mt-1 font-bold">{scoreFormatted}</span>
      </div>
    )
  } else if (sentiment === "negative") {
    return (
      <div className="flex flex-col items-center text-[hsl(var(--negative))]" title={`Negative: ${scoreFormatted}`}>
        <ThumbsDown className="h-6 w-6" />
        <span className="text-xs mt-1 font-bold">{scoreFormatted}</span>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center text-[hsl(var(--neutral))]" title={`Neutral: ${scoreFormatted}`}>
        <Minus className="h-6 w-6" />
        <span className="text-xs mt-1 font-bold">{scoreFormatted}</span>
      </div>
    )
  }
}

