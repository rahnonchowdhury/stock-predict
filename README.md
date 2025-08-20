# Stock Price Decline Prediction Website

A web application that predicts weekly stock price declines using news sentiment analysis, technical indicators, and real-time market data.

## Features

- Real-time stock data integration with Alpha Vantage API
- News sentiment analysis with confidence scoring
- Technical indicators (RSI, Bollinger Bands, volume analysis)
- Mathematical prediction algorithm combining multiple factors
- Professional UI with risk disclaimers

## Prediction Formula

```
Weekly_Decline_% = Base_Decline + (Sentiment_Score × 0.3) + (Volume_Anomaly × 0.2) + (Technical_Indicator × 0.15) + (Market_Correlation × 0.1)
```

## Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Radix UI, TanStack Query  
**Backend:** Node.js, Express.js, TypeScript, Drizzle ORM, Zod validation  
**APIs:** Alpha Vantage (stock data), sentiment analysis for news processing

## Quick Start

1. **Get API Key**: Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key) for free
2. **Setup**:
   ```bash
   git clone <repo-url>
   cd stock-prediction-website
   npm install
   cp .env.example .env  # Add your API key
   npm run dev
   ```
3. **Use**: Visit `http://localhost:5000`, enter a stock ticker (AAPL, TSLA), get predictions

## What I Learned

### Full-Stack Development
- Built complete React frontend with TypeScript for type safety
- Created Express.js REST API with proper error handling and validation
- Implemented shared TypeScript schemas between frontend/backend

### Financial & Data Analysis
- Calculated technical indicators (RSI, Bollinger Bands) from scratch
- Developed weighted sentiment analysis algorithm for news processing
- Implemented complex prediction formula combining multiple market factors

### API Integration & Data Processing
- Integrated Alpha Vantage API with rate limiting and caching
- Processed real-time stock data and historical price calculations
- Built robust error handling for external API failures

### Modern Frontend Patterns
- Used TanStack Query for server state management and caching
- Implemented React Hook Form with Zod validation schemas
- Built accessible UI with Radix UI primitives and Tailwind CSS

### DevOps & Production
- Set up TypeScript compilation for both frontend and backend
- Implemented environment variable management and security
- Created comprehensive documentation and CI/CD pipeline

## API Usage

```bash
# Analyze a stock
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"AAPL","analysisType":"standard"}'
```