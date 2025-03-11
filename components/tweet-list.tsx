import type { Tweet } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsDown, ThumbsUp, Minus } from "lucide-react"

export default function TweetList({ tweets }: { tweets: Tweet[] }) {
  if (tweets.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">No tweets found in this category</p>
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <Card key={tweet.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">@{tweet.username}</span>
                  <span className="text-sm text-muted-foreground">{new Date(tweet.date).toLocaleDateString()}</span>
                </div>
                <p>{tweet.text}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <span>{tweet.likes} likes</span>
                  <span>•</span>
                  <span>{tweet.retweets} retweets</span>
                </div>
              </div>
              <div className="ml-4">
                <SentimentIcon sentiment={tweet.sentiment} score={tweet.score} />
              </div>
            </div>
          </CardContent>
        </Card>
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
      <div className="flex flex-col items-center text-green-500" title={`Positive: ${scoreFormatted}`}>
        <ThumbsUp className="h-6 w-6" />
        <span className="text-xs mt-1">{scoreFormatted}</span>
      </div>
    )
  } else if (sentiment === "negative") {
    return (
      <div className="flex flex-col items-center text-red-500" title={`Negative: ${scoreFormatted}`}>
        <ThumbsDown className="h-6 w-6" />
        <span className="text-xs mt-1">{scoreFormatted}</span>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center text-blue-500" title={`Neutral: ${scoreFormatted}`}>
        <Minus className="h-6 w-6" />
        <span className="text-xs mt-1">{scoreFormatted}</span>
      </div>
    )
  }
}

