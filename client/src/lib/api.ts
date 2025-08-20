import { apiRequest } from "./queryClient";
import { StockRequest, StockAnalysis } from "@shared/schema";

export const stockApi = {
  analyzeStock: async (request: StockRequest): Promise<StockAnalysis> => {
    const response = await apiRequest("POST", "/api/analyze", request);
    return response.json();
  },

  getRecentAnalyses: async (): Promise<StockAnalysis[]> => {
    const response = await apiRequest("GET", "/api/analyses/recent");
    return response.json();
  },

  getAnalysis: async (ticker: string): Promise<StockAnalysis> => {
    const response = await apiRequest("GET", `/api/analysis/${ticker}`);
    return response.json();
  },
};
