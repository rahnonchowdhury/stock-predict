import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PredictionService } from "./services/prediction-service";
import { stockRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const predictionService = new PredictionService();

  // Analyze stock endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { ticker, analysisType } = stockRequestSchema.parse(req.body);
      
      // Check if we have a recent analysis (within last hour)
      const existingAnalysis = await storage.getStockAnalysis(ticker);
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      if (existingAnalysis && new Date(existingAnalysis.createdAt) > oneHourAgo) {
        return res.json(existingAnalysis);
      }

      // Generate new prediction
      const analysis = await predictionService.generatePrediction(ticker, analysisType);
      const savedAnalysis = await storage.saveStockAnalysis(analysis);
      
      res.json(savedAnalysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Analysis failed" 
      });
    }
  });

  // Get recent analyses
  app.get("/api/analyses/recent", async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses(10);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching recent analyses:", error);
      res.status(500).json({ message: "Failed to fetch recent analyses" });
    }
  });

  // Get specific analysis
  app.get("/api/analysis/:ticker", async (req, res) => {
    try {
      const { ticker } = req.params;
      const analysis = await storage.getStockAnalysis(ticker.toUpperCase());
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
