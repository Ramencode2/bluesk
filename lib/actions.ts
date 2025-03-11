"use server"

import type { SentimentData, Skeet } from "./types"

// This is a mock implementation - in a real app, you would connect to Bluesky API
// and use a sentiment analysis service or library
export async function analyzeSentiment(query: string): Promise<SentimentData> {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/analyze?term=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const responseData = await response.json();
    const skeets = responseData.data?.posts || 
                   responseData.posts || 
                   responseData.data || 
                   [];

    if (!Array.isArray(skeets)) {
      throw new Error(`Invalid response format: expected array of skeets, got ${typeof skeets}`);
    }

    // Log raw data for debugging
    console.log('Raw Skeet Data:', JSON.stringify(skeets, null, 2));

    // Initialize counters
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    // Process each skeet
    const processedSkeets: Skeet[] = skeets.map((skeet: any) => {
      // Extract and validate sentiment
      let sentiment = skeet.sentiment?.sentiment?.toLowerCase() || 'neutral';
      const validSentiments = ['positive', 'neutral', 'negative'];
      
      if (!validSentiments.includes(sentiment)) {
        console.warn(`Invalid sentiment value: ${sentiment} for skeet ${skeet.id}`);
        sentiment = 'neutral';
      }

      const score = skeet.sentiment?.score || 0;

      // Log each skeet's sentiment for debugging
      console.log(`Skeet ${skeet.id} - Sentiment: ${sentiment}, Score: ${score}`);

      // Update counters based on sentiment
      switch (sentiment) {
        case 'positive':
          positive++;
          break;
        case 'neutral':
          neutral++;
          break;
        case 'negative':
          negative++;
          break;
      }

      return {
        id: skeet.id,
        text: skeet.text,
        username: skeet.username || 'unknown',
        date: skeet.created_at,
        likes: skeet.likes || 0,
        retweets: skeet.retweets || 0,
        sentiment,
        score
      };
    });

    const total = positive + neutral + negative;

    // Calculate percentages
    const positivePercent = total > 0 ? (positive / total) * 100 : 0;
    const neutralPercent = total > 0 ? (neutral / total) * 100 : 0;
    const negativePercent = total > 0 ? (negative / total) * 100 : 0;

    return {
      summary: {
        positive: Math.round(positivePercent),
        neutral: Math.round(neutralPercent),
        negative: Math.round(negativePercent),
        total
      },
      skeets: processedSkeets
    };
    
  } catch (error) {
    let errorMessage = 'Failed to analyze sentiment';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error analyzing sentiment:', error);
    throw new Error(errorMessage);
  }
}

