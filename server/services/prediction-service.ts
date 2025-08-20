import { StockData, TechnicalIndicators, NewsArticle, InsertStockAnalysis } from "@shared/schema";
import { StockService } from "./stock-service";
import { NewsService } from "./news-service";

export class PredictionService {
  private stockService: StockService;
  private newsService: NewsService;

  constructor() {
    this.stockService = new StockService();
    this.newsService = new NewsService();
  }

  async generatePrediction(ticker: string, analysisType: string): Promise<InsertStockAnalysis> {
    // Get stock data and technical indicators
    const stockData = await this.stockService.getStockData(ticker);
    const technicalIndicators = this.stockService.calculateTechnicalIndicators(stockData);

    // Get news and sentiment analysis
    const newsArticles = await this.newsService.getNewsForStock(ticker);
    const sentimentScore = this.newsService.calculateSentimentScore(newsArticles);

    // Calculate prediction using the specified formula
    const prediction = this.calculatePrediction(stockData, technicalIndicators, sentimentScore);

    // Calculate confidence level
    const confidenceLevel = this.calculateConfidenceLevel(stockData, newsArticles, technicalIndicators);

    // Format market cap and volume for display
    const marketCap = this.formatMarketCap(stockData.marketCap);
    const volume = this.formatVolume(stockData.volume);

    return {
      ticker: ticker.toUpperCase(),
      predictionPercentage: prediction.weeklyDecline,
      confidenceLevel,
      baseDecline: prediction.baseDecline,
      sentimentScore,
      sentimentImpact: prediction.sentimentImpact,
      volumeImpact: prediction.volumeImpact,
      technicalImpact: prediction.technicalImpact,
      marketCorrelation: prediction.marketCorrelation,
      currentPrice: stockData.price,
      dailyChange: stockData.changePercent,
      volume,
      marketCap,
      rsiValue: technicalIndicators.rsi,
      newsArticles: newsArticles,
    };
  }

  private calculatePrediction(
    stockData: StockData,
    technicalIndicators: TechnicalIndicators,
    sentimentScore: number
  ): {
    weeklyDecline: number;
    baseDecline: number;
    sentimentImpact: number;
    volumeImpact: number;
    technicalImpact: number;
    marketCorrelation: number;
  } {
    // Base decline: 5-week historical average decline percentage
    const baseDecline = this.calculateBaseDecline(stockData.historicalPrices);

    // Sentiment impact: Sentiment score normalized to -10 to +10 scale
    const normalizedSentiment = Math.max(-10, Math.min(10, sentimentScore));
    const sentimentImpact = normalizedSentiment * 0.3;

    // Volume anomaly impact
    const volumeImpact = technicalIndicators.volumeAnomaly * 0.2;

    // Technical indicator impact (RSI deviation from 50 + Bollinger Band position)
    const rsiDeviation = (technicalIndicators.rsi - 50) / 50; // Normalize RSI deviation
    let bollingerPosition = 0;
    if (technicalIndicators.currentPosition === 'lower') bollingerPosition = -0.5;
    else if (technicalIndicators.currentPosition === 'upper') bollingerPosition = 0.5;
    
    const technicalImpact = (rsiDeviation + bollingerPosition) * 0.15;

    // Market correlation (simplified S&P 500 beta coefficient)
    const marketCorrelation = this.calculateMarketCorrelation(stockData) * 0.1;

    // Apply the prediction formula
    const weeklyDecline = baseDecline + sentimentImpact + volumeImpact + technicalImpact + marketCorrelation;

    return {
      weeklyDecline: Math.round(weeklyDecline * 100) / 100, // Round to 2 decimal places
      baseDecline: Math.round(baseDecline * 100) / 100,
      sentimentImpact: Math.round(sentimentImpact * 100) / 100,
      volumeImpact: Math.round(volumeImpact * 100) / 100,
      technicalImpact: Math.round(technicalImpact * 100) / 100,
      marketCorrelation: Math.round(marketCorrelation * 100) / 100,
    };
  }

  private calculateBaseDecline(historicalPrices: number[]): number {
    if (historicalPrices.length < 5) return -2.0; // Default decline

    // Calculate weekly changes (assuming 5 trading days per week)
    const weeklyChanges: number[] = [];
    for (let i = 0; i < Math.min(5, Math.floor(historicalPrices.length / 5)); i++) {
      const weekStart = i * 5;
      const weekEnd = weekStart + 4;
      if (weekEnd < historicalPrices.length) {
        const startPrice = historicalPrices[weekEnd];
        const endPrice = historicalPrices[weekStart];
        const weeklyChange = ((endPrice - startPrice) / startPrice) * 100;
        weeklyChanges.push(weeklyChange);
      }
    }

    if (weeklyChanges.length === 0) return -2.0;

    return weeklyChanges.reduce((a, b) => a + b, 0) / weeklyChanges.length;
  }

  private calculateMarketCorrelation(stockData: StockData): number {
    // Simplified correlation calculation
    // In reality, this would compare stock movements with S&P 500
    // For now, use volatility as a proxy
    const prices = stockData.historicalPrices;
    if (prices.length < 2) return 0.7; // Default correlation

    const changes = [];
    for (let i = 1; i < prices.length; i++) {
      changes.push((prices[i-1] - prices[i]) / prices[i]);
    }

    const volatility = this.calculateVolatility(changes);
    // Higher volatility suggests higher correlation with market stress
    return Math.min(1.0, 0.5 + volatility * 10);
  }

  private calculateVolatility(changes: number[]): number {
    if (changes.length === 0) return 0;
    
    const mean = changes.reduce((a, b) => a + b, 0) / changes.length;
    const variance = changes.reduce((sum, change) => sum + Math.pow(change - mean, 2), 0) / changes.length;
    return Math.sqrt(variance);
  }

  private calculateConfidenceLevel(
    stockData: StockData,
    newsArticles: NewsArticle[],
    technicalIndicators: TechnicalIndicators
  ): number {
    let confidence = 50; // Base confidence

    // Data quality factor (based on availability of historical data)
    if (stockData.historicalPrices.length >= 20) confidence += 20;
    else if (stockData.historicalPrices.length >= 10) confidence += 10;

    // News coverage factor
    if (newsArticles.length >= 5) confidence += 15;
    else if (newsArticles.length >= 3) confidence += 10;
    else if (newsArticles.length >= 1) confidence += 5;

    // Technical indicator reliability
    if (technicalIndicators.rsi < 30 || technicalIndicators.rsi > 70) confidence += 10; // Strong RSI signals
    if (technicalIndicators.currentPosition !== 'middle') confidence += 5; // Clear Bollinger position

    // Volume factor
    if (Math.abs(technicalIndicators.volumeAnomaly) > 0.2) confidence += 5; // Significant volume anomaly

    // Market volatility penalty (high volatility reduces confidence)
    const volatility = this.calculateVolatility(
      stockData.historicalPrices.slice(0, 10).map((price, i, arr) => 
        i > 0 ? (price - arr[i-1]) / arr[i-1] : 0
      ).slice(1)
    );
    
    if (volatility > 0.05) confidence -= 15; // High volatility
    else if (volatility > 0.03) confidence -= 10; // Medium volatility

    return Math.max(10, Math.min(95, Math.round(confidence)));
  }

  private formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  }

  private formatVolume(volume: number): string {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toString();
  }
}
