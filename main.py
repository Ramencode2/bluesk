from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from atproto import Client
import os
from dotenv import load_dotenv
import logging
import re
from typing import List, Dict, Any

load_dotenv()

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Initialize Bluesky client
bsky_client = Client()
bsky_client.login(os.getenv("BSKY_USERNAME"), os.getenv("BSKY_PASSWORD"))

# Initialize sentiment analyzer with a robust model
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment",
    return_all_scores=True
)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.get("/api/analyze")
async def analyze_posts(term: str):
    """
    Endpoint for analyzing Bluesky posts
    Returns data in a format optimized for frontend consumption
    """
    try:
        # Fetch posts from Bluesky
        response = bsky_client.app.bsky.feed.search_posts(
            params={'q': term, 'limit': 100}
        )
        
        # Analyze each post
        analyzed_posts = []
        for post in response.posts:
            analysis = analyze_sentiment(post.record.text)
            analyzed_posts.append({
                "id": post.uri,
                "text": post.record.text,
                "sentiment": analysis,
                "created_at": post.record.created_at,
                "likes": post.like_count,
                "retweets": post.repost_count
            })
        
        return {"data": analyzed_posts}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def clean_text(text: str) -> str:
    # Remove URLs, mentions, and special characters
    text = re.sub(r'http\S+|@|\#', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

def analyze_sentiment(text: str) -> dict:
    try:
        # Clean text before analysis
        cleaned_text = clean_text(text)
        if not cleaned_text:
            return {"sentiment": "neutral", "score": 0}
        
        # Get sentiment scores
        results = sentiment_analyzer(cleaned_text, top_k=None)
        
        # Ensure results is a list of dictionaries
        if not isinstance(results, list) or not all(isinstance(r, dict) for r in results):
            raise ValueError("Unexpected sentiment analysis result format")
        
        # Map labels to sentiments
        label_map = {
            "LABEL_0": "negative",
            "LABEL_1": "neutral",
            "LABEL_2": "positive"
        }
        
        # Convert to our format
        sentiment_scores = {label_map[r['label']]: r['score'] for r in results}
        
        # Determine dominant sentiment
        dominant_sentiment = max(sentiment_scores, key=sentiment_scores.get)
        
        return {
            "sentiment": dominant_sentiment,
            "score": sentiment_scores[dominant_sentiment]
        }
        
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")
        return {"sentiment": "neutral", "score": 0}

test_cases = [
    "I love this! It's amazing!",
    "This is the worst experience ever.",
    "The weather is nice today.",
    "Meh, it's okay I guess."
]

for text in test_cases:
    analysis = analyze_sentiment(text)
    print(f"Text: {text}")
    print(f"Analysis: {analysis}\n")
