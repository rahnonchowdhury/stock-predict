# API Documentation

## Overview

The Stock Prediction API provides endpoints for analyzing stocks and generating decline predictions based on market data, news sentiment, and technical indicators.

**Base URL**: `http://localhost:5000/api`

## Authentication

Currently no authentication is required for API access. Rate limiting is applied to prevent abuse.

## Rate Limiting

- **Limit**: 100 requests per 15-minute window per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: Time when rate limit resets

## Endpoints

### POST /api/analyze

Analyze a stock and generate a weekly decline prediction.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "ticker": "AAPL",
  "analysisType": "standard"
}
```

**Parameters:**
- `ticker` (string, required): Stock ticker symbol (1-10 uppercase letters)
- `analysisType` (string, optional): Analysis depth
  - `"quick"`: Basic analysis
  - `"standard"`: Default comprehensive analysis
  - `"comprehensive"`: Extended analysis with additional factors

#### Response

**Success (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "ticker": "AAPL",
  "predictionPercentage": -2.47,
  "confidenceLevel": 73,
  "baseDecline": -1.2,
  "sentimentScore": -4.8,
  "sentimentImpact": -1.44,
  "volumeImpact": 0.15,
  "technicalImpact": -0.12,
  "marketCorrelation": 0.14,
  "currentPrice": 184.32,
  "dailyChange": -1.23,
  "volume": "12.4M",
  "marketCap": "$2.85T",
  "rsiValue": 45.6,
  "newsArticles": [
    {
      "title": "AAPL Faces Supply Chain Disruptions",
      "source": "Reuters",
      "publishedAt": "2024-08-20T18:53:00.000Z",
      "sentiment": -7.5,
      "summary": "Manufacturing delays expected to impact Q4 earnings significantly...",
      "url": "https://reuters.com/example"
    }
  ],
  "createdAt": "2024-08-20T21:53:00.000Z"
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Invalid stock symbol or API limit reached"
}
```

### GET /api/analyses/recent

Retrieve the most recent stock analyses.

#### Request

**Parameters:**
- `limit` (query parameter, optional): Number of results to return (default: 10, max: 50)

**Example:**
```
GET /api/analyses/recent?limit=5
```

#### Response

**Success (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "ticker": "AAPL",
    "predictionPercentage": -2.47,
    "confidenceLevel": 73,
    "createdAt": "2024-08-20T21:53:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "ticker": "MSFT",
    "predictionPercentage": -0.61,
    "confidenceLevel": 68,
    "createdAt": "2024-08-20T21:52:00.000Z"
  }
]
```

### GET /api/analysis/:ticker

Retrieve the most recent analysis for a specific stock ticker.

#### Request

**Path Parameters:**
- `ticker` (string, required): Stock ticker symbol

**Example:**
```
GET /api/analysis/AAPL
```

#### Response

**Success (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "ticker": "AAPL",
  "predictionPercentage": -2.47,
  "confidenceLevel": 73,
  "baseDecline": -1.2,
  "sentimentScore": -4.8,
  "sentimentImpact": -1.44,
  "volumeImpact": 0.15,
  "technicalImpact": -0.12,
  "marketCorrelation": 0.14,
  "currentPrice": 184.32,
  "dailyChange": -1.23,
  "volume": "12.4M",
  "marketCap": "$2.85T",
  "rsiValue": 45.6,
  "newsArticles": [...],
  "createdAt": "2024-08-20T21:53:00.000Z"
}
```

**Error (404 Not Found):**
```json
{
  "message": "Analysis not found"
}
```

## Data Models

### StockAnalysis

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (UUID) |
| ticker | string | Stock ticker symbol |
| predictionPercentage | number | Predicted weekly decline percentage |
| confidenceLevel | number | Confidence level (0-100) |
| baseDecline | number | Historical 5-week average decline |
| sentimentScore | number | News sentiment score (-10 to +10) |
| sentimentImpact | number | Sentiment contribution to prediction |
| volumeImpact | number | Volume anomaly contribution |
| technicalImpact | number | Technical indicators contribution |
| marketCorrelation | number | Market correlation contribution |
| currentPrice | number | Current stock price |
| dailyChange | number | Daily price change percentage |
| volume | string | Formatted trading volume |
| marketCap | string | Formatted market capitalization |
| rsiValue | number | Relative Strength Index (0-100) |
| newsArticles | NewsArticle[] | Array of analyzed news articles |
| createdAt | string | ISO 8601 timestamp |

### NewsArticle

| Field | Type | Description |
|-------|------|-------------|
| title | string | Article headline |
| source | string | News source (Reuters, Bloomberg, etc.) |
| publishedAt | string | ISO 8601 publication timestamp |
| sentiment | number | Sentiment score (-10 to +10) |
| summary | string | Article summary |
| url | string | Link to original article (optional) |

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input parameters |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Example Usage

### JavaScript/Node.js

```javascript
// Analyze a stock
const response = await fetch('http://localhost:5000/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ticker: 'AAPL',
    analysisType: 'standard'
  })
});

const analysis = await response.json();
console.log(`Prediction: ${analysis.predictionPercentage}%`);
```

### Python

```python
import requests

response = requests.post('http://localhost:5000/api/analyze', json={
    'ticker': 'AAPL',
    'analysisType': 'standard'
})

analysis = response.json()
print(f"Prediction: {analysis['predictionPercentage']}%")
```

### cURL

```bash
# Analyze a stock
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"AAPL","analysisType":"standard"}'

# Get recent analyses
curl http://localhost:5000/api/analyses/recent

# Get specific analysis
curl http://localhost:5000/api/analysis/AAPL
```

## Caching

- Analyses are cached for 1 hour per ticker symbol
- Recent API calls will return cached results to improve performance
- Cache automatically expires and refreshes with new data

## Limitations

- **Alpha Vantage API**: 25 calls per day, 5 calls per minute (free tier)
- **News Data**: Currently uses structured mock data for demonstration
- **Historical Data**: Limited to available historical price data
- **Prediction Accuracy**: No guarantee of prediction accuracy

## Support

For API issues or questions:
1. Check error messages for specific guidance
2. Verify API rate limits haven't been exceeded
3. Ensure valid stock ticker symbols are used
4. Review this documentation for proper usage patterns