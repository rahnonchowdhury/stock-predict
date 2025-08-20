import { NewsArticle } from "@shared/schema";

export class NewsService {
  async getNewsForStock(symbol: string): Promise<NewsArticle[]> {
    // For MVP, return structured mock data that represents realistic news scenarios
    // In production, this would integrate with news APIs like NewsAPI, Finnhub, etc.
    
    const mockNews: NewsArticle[] = [
      {
        title: `${symbol} Faces Supply Chain Disruptions`,
        source: "Reuters",
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        sentiment: -7.5,
        summary: "Manufacturing delays expected to impact Q4 earnings significantly...",
        url: "https://reuters.com/example"
      },
      {
        title: `Regulatory Concerns Mount for ${symbol}`,
        source: "MarketWatch",
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        sentiment: -5.8,
        summary: "New legislation could impact revenue streams significantly...",
        url: "https://marketwatch.com/example"
      },
      {
        title: `${symbol} Announces Innovation Partnership`,
        source: "Bloomberg",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        sentiment: 4.2,
        summary: "Strategic partnership expected to enhance product capabilities...",
        url: "https://bloomberg.com/example"
      },
      {
        title: `Analysts Downgrade ${symbol} Following Earnings Miss`,
        source: "Yahoo Finance",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        sentiment: -6.3,
        summary: "Multiple investment firms lower price targets after disappointing quarterly results...",
        url: "https://finance.yahoo.com/example"
      },
      {
        title: `${symbol} Insider Trading Activity Raises Questions`,
        source: "CNN Business",
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        sentiment: -4.1,
        summary: "Unusual insider selling patterns detected in recent SEC filings...",
        url: "https://cnn.com/business/example"
      }
    ];

    return mockNews;
  }

  calculateSentimentScore(articles: NewsArticle[]): number {
    if (articles.length === 0) return 0;

    // Weight more recent articles higher
    const weightedScores = articles.map((article, index) => {
      const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
      const recencyWeight = Math.max(0.1, 1 - (hoursAgo / 48)); // Decay over 48 hours
      const sourceWeight = this.getSourceWeight(article.source);
      
      return article.sentiment * recencyWeight * sourceWeight;
    });

    const totalWeight = articles.reduce((sum, article, index) => {
      const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
      const recencyWeight = Math.max(0.1, 1 - (hoursAgo / 48));
      const sourceWeight = this.getSourceWeight(article.source);
      return sum + (recencyWeight * sourceWeight);
    }, 0);

    return weightedScores.reduce((a, b) => a + b, 0) / totalWeight;
  }

  private getSourceWeight(source: string): number {
    const weights: Record<string, number> = {
      "Reuters": 1.0,
      "Bloomberg": 1.0,
      "MarketWatch": 0.9,
      "Yahoo Finance": 0.8,
      "CNN Business": 0.8,
      "CNBC": 0.9,
      "Financial Times": 1.0,
      "Wall Street Journal": 1.0,
    };

    return weights[source] || 0.7; // Default weight for unknown sources
  }
}
