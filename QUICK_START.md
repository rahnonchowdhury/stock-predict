# Quick Start Guide

Get your Stock Prediction Website running in under 5 minutes!

## ⚡ Instant Setup

### 1. Get API Key (30 seconds)
```bash
# Visit: https://www.alphavantage.co/support/#api-key
# Sign up → Get instant free API key
```

### 2. Configure Environment (30 seconds)
```bash
# Copy the template
cp .env.example .env

# Edit .env and add your key:
ALPHA_VANTAGE_API_KEY=your_key_here
```

### 3. Run Application (1 minute)
```bash
# Install dependencies
npm install

# Start the app
npm run dev

# Open http://localhost:5000
```

## 🧪 Test the App

1. **Enter a stock ticker**: Try `AAPL`, `MSFT`, or `TSLA`
2. **Select analysis type**: Choose "Standard Analysis"
3. **Click "Analyze Stock"**: Get prediction in seconds!

## 📊 What You'll See

- **Prediction**: Weekly decline percentage with confidence level
- **News Analysis**: Sentiment from financial news sources
- **Technical Indicators**: RSI, Bollinger Bands, volume analysis
- **Risk Assessment**: Color-coded risk levels and warnings

## 🎯 Sample Results

```
Ticker: AAPL
Prediction: -2.47% decline expected
Confidence: 73% (High Confidence)
Risk Level: MEDIUM
```

## 📖 Next Steps

- **Documentation**: Read [README.md](README.md) for full details
- **API Guide**: Check [docs/API.md](docs/API.md) for API usage
- **Deployment**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for hosting
- **Contributing**: Review [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) to help

## ⚠️ Important Notes

- **Free API Limit**: 25 calls per day with Alpha Vantage free tier
- **Not Financial Advice**: This is for educational purposes only
- **Risk Warning**: Stock predictions are uncertain - never invest solely based on these predictions

## 🆘 Common Issues

**API Key Error?**
```bash
# Check if key is set
echo $ALPHA_VANTAGE_API_KEY

# Verify key works
curl "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY"
```

**Port Already in Use?**
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)
```

**Dependencies Issues?**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

Happy analyzing! 📈