import { StockData, TechnicalIndicators } from "@shared/schema";

export class StockService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.ALPHA_VANTAGE_API_KEY || process.env.VITE_ALPHA_VANTAGE_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("Alpha Vantage API key is required");
    }
  }

  async getStockData(symbol: string): Promise<StockData> {
    const baseUrl = "https://www.alphavantage.co/query";
    
    try {
      // Get current quote
      const quoteResponse = await fetch(
        `${baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
      );
      const quoteData = await quoteResponse.json();

      if (quoteData["Error Message"] || quoteData["Note"]) {
        throw new Error("Invalid stock symbol or API limit reached");
      }

      const quote = quoteData["Global Quote"];
      if (!quote) {
        throw new Error("Stock data not found");
      }

      // Get historical data for technical analysis
      const historicalResponse = await fetch(
        `${baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`
      );
      const historicalData = await historicalResponse.json();

      const timeSeries = historicalData["Time Series (Daily)"];
      if (!timeSeries) {
        throw new Error("Historical data not available");
      }

      // Extract last 20 days of prices for calculations
      const prices = Object.values(timeSeries)
        .slice(0, 20)
        .map((day: any) => parseFloat(day["4. close"]));

      const price = parseFloat(quote["05. price"]);
      const change = parseFloat(quote["09. change"]);
      const changePercent = parseFloat(quote["10. change percent"].replace("%", ""));
      const volume = parseInt(quote["06. volume"]);

      // Calculate average volume from historical data
      const volumes = Object.values(timeSeries)
        .slice(0, 20)
        .map((day: any) => parseInt(day["5. volume"]));
      const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

      return {
        symbol,
        price,
        change,
        changePercent,
        volume,
        marketCap: this.calculateMarketCap(price, volume), // Simplified calculation
        high52Week: Math.max(...prices),
        low52Week: Math.min(...prices),
        avgVolume,
        historicalPrices: prices,
      };
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw new Error("Failed to fetch stock data");
    }
  }

  calculateTechnicalIndicators(stockData: StockData): TechnicalIndicators {
    const prices = stockData.historicalPrices;
    const currentPrice = stockData.price;

    // Calculate RSI (simplified 14-period)
    const rsi = this.calculateRSI(prices);

    // Calculate Bollinger Bands (20-period, 2 standard deviations)
    const { upper, middle, lower } = this.calculateBollingerBands(prices);

    // Determine current position relative to Bollinger Bands
    let currentPosition: 'upper' | 'middle' | 'lower' = 'middle';
    if (currentPrice > upper) currentPosition = 'upper';
    else if (currentPrice < lower) currentPosition = 'lower';

    // Calculate volume anomaly
    const volumeAnomaly = (stockData.volume - stockData.avgVolume) / stockData.avgVolume;

    return {
      rsi,
      bollingerUpper: upper,
      bollingerLower: lower,
      bollingerMiddle: middle,
      currentPosition,
      volumeAnomaly,
    };
  }

  private calculateRSI(prices: number[], period = 14): number {
    if (prices.length < period + 1) return 50; // Default neutral RSI

    let gains = 0;
    let losses = 0;

    // Calculate initial average gain and loss
    for (let i = 1; i <= period; i++) {
      const change = prices[i - 1] - prices[i];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  private calculateBollingerBands(prices: number[], period = 20): { upper: number; middle: number; lower: number } {
    if (prices.length < period) {
      const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
      return { upper: avg * 1.02, middle: avg, lower: avg * 0.98 };
    }

    const relevantPrices = prices.slice(0, period);
    const middle = relevantPrices.reduce((a, b) => a + b, 0) / period;

    // Calculate standard deviation
    const variance = relevantPrices.reduce((sum, price) => sum + Math.pow(price - middle, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    return {
      upper: middle + (2 * stdDev),
      middle,
      lower: middle - (2 * stdDev),
    };
  }

  private calculateMarketCap(price: number, volume: number): number {
    // Simplified market cap estimation (this would normally require shares outstanding)
    // Using volume as a proxy for activity level
    return price * volume * 100; // Very rough estimation
  }
}
