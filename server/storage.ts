import { type StockAnalysis, type InsertStockAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveStockAnalysis(analysis: InsertStockAnalysis): Promise<StockAnalysis>;
  getStockAnalysis(ticker: string): Promise<StockAnalysis | undefined>;
  getRecentAnalyses(limit?: number): Promise<StockAnalysis[]>;
}

export class MemStorage implements IStorage {
  private analyses: Map<string, StockAnalysis>;

  constructor() {
    this.analyses = new Map();
  }

  async saveStockAnalysis(insertAnalysis: InsertStockAnalysis): Promise<StockAnalysis> {
    const id = randomUUID();
    const analysis: StockAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: new Date(),
    };
    
    // Use ticker as key to allow easy retrieval of latest analysis
    this.analyses.set(insertAnalysis.ticker, analysis);
    return analysis;
  }

  async getStockAnalysis(ticker: string): Promise<StockAnalysis | undefined> {
    return this.analyses.get(ticker);
  }

  async getRecentAnalyses(limit = 10): Promise<StockAnalysis[]> {
    const analyses = Array.from(this.analyses.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    return analyses;
  }
}

export const storage = new MemStorage();
