import { useState } from "react";
import { StockInput } from "@/components/stock-input";
import { LoadingState } from "@/components/loading-state";
import { PredictionResults } from "@/components/prediction-results";
import { NewsAnalysis } from "@/components/news-analysis";
import { TechnicalAnalysis } from "@/components/technical-analysis";
import { Disclaimer } from "@/components/disclaimer";
import { ChartLine, Clock } from "lucide-react";
import { StockAnalysis } from "@shared/schema";

export default function Home() {
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (result: StockAnalysis) => {
    setAnalysis(result);
    setIsLoading(false);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setAnalysis(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ChartLine className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Stock Decline Predictor</h1>
                <p className="text-sm text-slate-600">Professional Financial Analysis Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm text-slate-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: <span className="ml-1">2 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stock Input Section */}
        <StockInput 
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
        />

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {analysis && !isLoading && (
          <>
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <PredictionResults analysis={analysis} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <NewsAnalysis analysis={analysis} />
              <TechnicalAnalysis analysis={analysis} />
            </div>
          </>
        )}

        {/* Disclaimer */}
        <Disclaimer />

        {/* Additional Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-download text-white text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Export Analysis</h3>
            <p className="text-sm text-slate-600 mb-4">Download detailed analysis report as PDF</p>
            <button 
              className="w-full bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              data-testid="button-export-report"
            >
              Download Report
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bell text-white text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Set Alert</h3>
            <p className="text-sm text-slate-600 mb-4">Get notified of significant changes</p>
            <button 
              className="w-full bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              data-testid="button-set-alert"
            >
              Create Alert
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-history text-white text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Analysis History</h3>
            <p className="text-sm text-slate-600 mb-4">View previous predictions and accuracy</p>
            <button 
              className="w-full bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              data-testid="button-view-history"
            >
              View History
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Stock Decline Predictor</h4>
              <p className="text-sm text-slate-600">Professional financial analysis tool providing data-driven stock predictions based on market sentiment and technical indicators.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Data Sources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Alpha Vantage API</li>
                <li>• Reuters Financial News</li>
                <li>• Yahoo Finance</li>
                <li>• MarketWatch</li>
                <li>• Bloomberg Terminal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Risk Disclaimers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 Stock Decline Predictor. All rights reserved. Not affiliated with any financial institution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
