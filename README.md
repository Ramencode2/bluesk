# Bluesky Sentiment Analysis

A full-stack web application that analyzes sentiment of posts (skeets) on Bluesky in real-time. The platform uses advanced AI models to classify public sentiment on any topic of interest.

## Overview

**Bluesk** is a sentiment analysis tool built for the Bluesky social network. It aggregates posts about a specific topic and uses machine learning to determine whether the overall sentiment is positive, neutral, or negative. Perfect for tracking public opinion, monitoring brand sentiment, or analyzing trending topics.

## Features

- 🔍 **Real-time Post Collection** - Fetch relevant skeets from Bluesky using search queries
- 🤖 **AI-Powered Sentiment Analysis** - Classify posts using `cardiffnlp/twitter-roberta-base-sentiment` model
- 📊 **Visual Analytics** - Interactive charts and visualizations of sentiment distribution
- 📥 **Data Export** - Download analysis results in multiple formats
- 🎨 **Modern UI** - Beautiful, responsive interface built with Next.js and Tailwind CSS
- ⚡ **Fast Performance** - Optimized backend with FastAPI and efficient text processing

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom animations
- **Components**: Radix UI component library
- **Visualization**: Recharts
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **UI Library**: shadcn/ui

### Backend
- **API**: FastAPI (Python)
- **Bluesky Integration**: atproto library
- **NLP**: Hugging Face Transformers (`cardiffnlp/twitter-roberta-base-sentiment`)
- **CORS**: Enabled for frontend communication

## Project Structure

```
bluesk/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home/landing page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── search/              # Search page
│   └── results/             # Results page
├── components/              # Reusable React components
├── lib/                     # Utility functions
├── hooks/                   # Custom React hooks
├── main.py                  # FastAPI backend server
├── package.json             # Node dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.mjs          # Next.js configuration
```

## Installation

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- Bluesky account credentials

### Frontend Setup

```bash
npm install
# or
npm install --legacy-peer-deps
```

### Backend Setup

```bash
pip install fastapi transformers atproto python-dotenv
```

## Configuration

Create a `.env` file in the root directory:

```env
BSKY_USERNAME=your_bluesky_username
BSKY_PASSWORD=your_bluesky_password
```

## Usage

### Development

**Start the frontend (Next.js):**
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

**Start the backend (FastAPI):**
```bash
python main.py
```
The API will be available at `http://localhost:8000`

### Production Build

```bash
npm run build
npm start
```

## How It Works

1. **Search** - User enters a topic of interest on the search page
2. **Collection** - The backend queries Bluesky's API for up to 100 posts matching the search term
3. **Analysis** - Each post is processed and analyzed using the sentiment analysis model
   - Text is cleaned (URLs, mentions, special characters removed)
   - Sentiment scores are calculated (positive, neutral, negative)
   - Dominant sentiment is determined
4. **Visualization** - Results are displayed with:
   - Sentiment distribution charts
   - Individual post sentiment tags
   - Engagement metrics (likes, reposts)
   - Sortable/filterable post list

## API Endpoints

### `/api/analyze`
Analyzes posts for a given search term.

**Query Parameters:**
- `term` (string, required) - The search term to analyze

**Response:**
```json
{
  "data": [
    {
      "id": "post_uri",
      "text": "post content",
      "sentiment": {
        "sentiment": "positive|neutral|negative",
        "score": 0.95
      },
      "created_at": "2024-01-01T12:00:00Z",
      "likes": 42,
      "retweets": 10
    }
  ]
}
```

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Enhancements

- [ ] Advanced filtering options (date range, engagement filters)
- [ ] Historical sentiment tracking
- [ ] Custom model training
- [ ] Multi-language support
- [ ] Real-time sentiment streaming
- [ ] User authentication and saved searches
