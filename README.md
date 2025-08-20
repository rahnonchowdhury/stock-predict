# Stock Price Decline Prediction Website

A comprehensive web application that predicts weekly stock price declines using advanced news sentiment analysis, technical indicators, and market correlation data.

![Stock Prediction Interface](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)

## 🚀 Features

- **Professional Interface**: Clean, responsive design optimized for both desktop and mobile
- **Real-time Stock Data**: Integration with Alpha Vantage API for live market data
- **Advanced Prediction Algorithm**: Implements a scientific formula combining multiple factors
- **News Sentiment Analysis**: Analyzes financial news from multiple sources with AI-powered sentiment scoring
- **Technical Analysis**: RSI, Bollinger Bands, and volume anomaly detection
- **Confidence Scoring**: Provides prediction confidence levels (0-100%)
- **Risk Assessment**: Color-coded risk levels with detailed explanations
- **Historical Data**: 5-week historical analysis for baseline calculations
- **Market Correlation**: S&P 500 beta coefficient integration
- **Comprehensive Disclaimers**: Prominent legal and risk warnings

## 🧮 Prediction Formula

The application implements a concrete mathematical formula:

```
Weekly_Decline_% = Base_Decline + (Sentiment_Score × 0.3) + (Volume_Anomaly × 0.2) + (Technical_Indicator × 0.15) + (Market_Correlation × 0.1)
```

**Where:**
- **Base_Decline**: Historical 5-week average decline percentage
- **Sentiment_Score**: Weighted news sentiment analysis (-10 to +10 scale)
- **Volume_Anomaly**: (Current_Volume - 20_Day_Avg_Volume) / 20_Day_Avg_Volume
- **Technical_Indicator**: RSI deviation from 50 + Bollinger Band position
- **Market_Correlation**: S&P 500 beta coefficient × market trend

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Wouter** for routing
- **TanStack Query** for state management
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **Zod** for schema validation
- **Sentiment Analysis** for news processing

### APIs & Data Sources
- **Alpha Vantage API** - Stock market data
- **News Aggregation** - Financial news from multiple sources
- **Technical Indicators** - RSI, Bollinger Bands calculation

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Alpha Vantage API key (free tier available)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/stock-prediction-website.git
cd stock-prediction-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### 4. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔑 API Keys Setup

### Alpha Vantage API Key (Required)
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Sign up for a free account
3. Get your API key instantly
4. Add it to your `.env` file

**Free Tier Limits**: 25 API calls per day, 5 calls per minute

## 📖 Usage

1. **Enter Stock Symbol**: Input a valid ticker symbol (e.g., AAPL, TSLA, MSFT)
2. **Select Analysis Type**: Choose from Standard, Comprehensive, or Quick analysis
3. **View Prediction**: Get detailed decline prediction with confidence level
4. **Analyze Results**: Review technical indicators, news sentiment, and risk factors
5. **Read Disclaimers**: Always consider the risk warnings before making decisions

## 🧪 Testing

### Manual Testing
- Test with various stock symbols (AAPL, MSFT, TSLA, GOOGL)
- Verify predictions are mathematically sound
- Check responsive design on different devices
- Validate error handling with invalid tickers

### Sample Test Cases
```bash
# Test popular stocks
AAPL, MSFT, GOOGL, AMZN, TSLA

# Test various market caps
Large Cap: AAPL, MSFT
Mid Cap: ROKU, SQ  
Small Cap: Individual research required
```

## 📊 API Documentation

### POST /api/analyze
Analyze a stock and generate prediction

**Request Body:**
```json
{
  "ticker": "AAPL",
  "analysisType": "standard"
}
```

**Response:**
```json
{
  "id": "uuid",
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

### GET /api/analyses/recent
Get recent analysis results

### GET /api/analysis/:ticker
Get specific stock analysis

## ⚠️ Important Disclaimers

**This is not financial advice.** This tool is for educational and informational purposes only. Key warnings:

- Stock predictions are inherently uncertain and may be incorrect
- Past performance does not guarantee future results
- All investments carry risk of loss
- Consult licensed financial advisors before making investment decisions
- The tool may contain errors, biases, or outdated information
- No warranty is provided for accuracy or reliability

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting protection
- Environment variable security
- CORS configuration
- Error handling without information disclosure

## 🚀 Deployment

### Production Deployment
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper API rate limiting
4. Enable error logging
5. Configure SSL/HTTPS

### Recommended Platforms
- **Replit** - Full-stack hosting with database
- **Vercel** - Frontend deployment
- **Railway** - Backend and database
- **Heroku** - Full-stack hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow existing code formatting
- Add comments for complex logic
- Include error handling
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Check existing documentation
- Review API rate limits if experiencing errors

## 🏗 Architecture

```
stock-prediction-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   └── pages/          # Route components
├── server/                 # Express backend
│   ├── services/           # Business logic
│   │   ├── stock-service.ts
│   │   ├── news-service.ts
│   │   └── prediction-service.ts
│   ├── routes.ts           # API routes
│   └── storage.ts          # Data persistence
├── shared/                 # Shared TypeScript schemas
└── docs/                   # Additional documentation
```

## 🔄 Version History

- **v1.0.0** - Initial release with core prediction functionality
- Full prediction algorithm implementation
- Professional UI with real-time data
- News sentiment analysis
- Technical indicators integration

---

**⚠️ Legal Notice**: This application is for educational purposes only. Not affiliated with any financial institution. Use at your own risk.