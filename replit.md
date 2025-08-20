# Stock Price Decline Prediction Website

## Overview

This is a comprehensive web application that predicts weekly stock price declines using news sentiment analysis and market indicators. The platform provides professional financial analysis by implementing a concrete prediction formula that combines sentiment analysis, technical indicators, volume anomalies, and market correlation data. Users can input stock tickers to receive detailed predictions with confidence levels, supporting reasoning, and comprehensive technical analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state and React Hook Form for form handling
- **Routing**: Wouter for lightweight client-side routing
- **Design System**: "New York" style variant with neutral base colors and extensive component coverage

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with structured error handling
- **Data Validation**: Zod schemas for request/response validation
- **Storage Pattern**: Abstract storage interface with in-memory implementation (ready for database migration)
- **Prediction Engine**: Service-based architecture with modular components for stock data, news analysis, and prediction calculations

### Prediction Algorithm
The application implements a specific formula:
```
Weekly_Decline_% = Base_Decline + (Sentiment_Score × 0.3) + (Volume_Anomaly × 0.2) + (Technical_Indicator × 0.15) + (Market_Correlation × 0.1)
```

Components include:
- **Base Decline**: Historical 5-week average decline percentage
- **Sentiment Score**: Weighted news sentiment analysis (-10 to +10 scale)
- **Volume Anomaly**: Current volume vs 20-day average comparison
- **Technical Indicators**: RSI deviation and Bollinger Band positioning
- **Market Correlation**: S&P 500 beta coefficient integration

### Data Architecture
- **Database**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Caching Strategy**: In-memory storage for analysis results with 1-hour expiration
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Data Models**: Comprehensive stock analysis structure with news articles, technical indicators, and prediction metrics

## External Dependencies

### Stock Market APIs
- **Alpha Vantage**: Primary stock data provider for real-time quotes and historical data
- **Yahoo Finance**: Fallback data source and additional market information
- **Finnhub**: Potential integration for enhanced news and financial data

### News and Sentiment Analysis
- **NewsAPI**: News aggregation service for multiple financial news sources
- **Mock Data System**: Currently implemented with realistic news scenarios for development
- **Target Sources**: Reuters, MarketWatch, Bloomberg, Yahoo Finance, CNN Business

### Database and Infrastructure
- **PostgreSQL**: Production database via Neon Database serverless platform
- **Drizzle Kit**: Database migration and schema management
- **Environment Variables**: Secure API key and database URL management

### UI and Development Tools
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Tailwind CSS**: Utility-first styling framework with custom design tokens
- **Replit Integration**: Development environment optimization with error overlay and cartographer plugins
- **TypeScript**: Full-stack type safety with strict configuration

### Key Features
- **Real-time Analysis**: Live stock data integration with caching optimization
- **Professional Interface**: Clean, responsive design with loading states and error handling
- **Risk Management**: Prominent disclaimer and confidence level indicators
- **Technical Analysis**: RSI, Bollinger Bands, and volume analysis integration
- **News Integration**: Multi-source news aggregation with sentiment scoring
- **Historical Tracking**: Recent analysis storage and retrieval system