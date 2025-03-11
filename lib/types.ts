export interface Tweet {
  id: string
  text: string
  username: string
  date: string
  likes: number
  retweets: number
  sentiment: "positive" | "neutral" | "negative"
  score: number
}

export interface SentimentSummary {
  positive: number
  neutral: number
  negative: number
  total: number
}

export interface SentimentData {
  summary: SentimentSummary
  skeets: Tweet[]
}

export type Skeet = {
  id: string;
  text: string;
  username: string;
  date: string;
  likes: number;
  retweets: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
};

