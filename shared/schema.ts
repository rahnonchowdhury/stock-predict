import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stockAnalyses = pgTable("stock_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticker: text("ticker").notNull(),
  predictionPercentage: real("prediction_percentage").notNull(),
  confidenceLevel: integer("confidence_level").notNull(),
  baseDecline: real("base_decline").notNull(),
  sentimentScore: real("sentiment_score").notNull(),
  sentimentImpact: real("sentiment_impact").notNull(),
  volumeImpact: real("volume_impact").notNull(),
  technicalImpact: real("technical_impact").notNull(),
  marketCorrelation: real("market_correlation").notNull(),
  currentPrice: real("current_price").notNull(),
  dailyChange: real("daily_change").notNull(),
  volume: text("volume").notNull(),
  marketCap: text("market_cap").notNull(),
  rsiValue: real("rsi_value").notNull(),
  newsArticles: json("news_articles").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStockAnalysisSchema = createInsertSchema(stockAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertStockAnalysis = z.infer<typeof insertStockAnalysisSchema>;
export type StockAnalysis = typeof stockAnalyses.$inferSelect;

export const stockRequestSchema = z.object({
  ticker: z.string().min(1).max(10).regex(/^[A-Z]+$/, "Ticker must contain only uppercase letters"),
  analysisType: z.enum(["standard", "comprehensive", "quick"]).default("standard"),
});

export type StockRequest = z.infer<typeof stockRequestSchema>;

export interface NewsArticle {
  title: string;
  source: string;
  publishedAt: string;
  sentiment: number;
  summary: string;
  url?: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  avgVolume: number;
  historicalPrices: number[];
}

export interface TechnicalIndicators {
  rsi: number;
  bollingerUpper: number;
  bollingerLower: number;
  bollingerMiddle: number;
  currentPosition: 'upper' | 'middle' | 'lower';
  volumeAnomaly: number;
}
