import { Card, CardContent } from "@/components/ui/card";
import { StockAnalysis } from "@shared/schema";

interface PredictionResultsProps {
  analysis: StockAnalysis;
}

export function PredictionResults({ analysis }: PredictionResultsProps) {
  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  };

  const getRiskLevel = (prediction: number) => {
    if (Math.abs(prediction) > 5) return { level: "HIGH", color: "text-red-600" };
    if (Math.abs(prediction) > 2) return { level: "MEDIUM", color: "text-warning" };
    return { level: "LOW", color: "text-secondary" };
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 60) return "Medium Confidence";
    return "Low Confidence";
  };

  const risk = getRiskLevel(analysis.predictionPercentage);

  return (
    <>
      {/* Main Prediction Card */}
      <div className="lg:col-span-2">
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Prediction Results</h3>
                <p className="text-sm text-slate-600" data-testid="text-timestamp">
                  Analysis completed at {formatTimestamp(analysis.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600">Stock Symbol</div>
                <div className="text-lg font-bold text-slate-900" data-testid="text-ticker">
                  {analysis.ticker}
                </div>
              </div>
            </div>

            {/* Primary Prediction Display */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-sm font-medium text-red-700 mb-2">PREDICTED WEEKLY DECLINE</div>
                <div className="text-4xl font-bold text-red-600 mb-2" data-testid="text-prediction">
                  {analysis.predictionPercentage > 0 ? '+' : ''}{analysis.predictionPercentage}%
                </div>
                <div className="text-sm text-red-600">Expected change for the coming week</div>
              </div>
              
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600">Confidence Level</div>
                  <div className="text-lg font-semibold text-slate-900" data-testid="text-confidence">
                    {analysis.confidenceLevel}%
                  </div>
                  <div className="text-xs text-slate-500">{getConfidenceText(analysis.confidenceLevel)}</div>
                </div>
                <div className="w-px h-12 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Risk Level</div>
                  <div className={`text-lg font-semibold ${risk.color}`} data-testid="text-risk">
                    {risk.level}
                  </div>
                  <div className="text-xs text-slate-500">
                    {Math.abs(analysis.predictionPercentage) > 5 ? "Elevated volatility" : "Normal volatility"}
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Prediction Breakdown</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Base Decline</span>
                    <span className="text-sm text-slate-900" data-testid="text-base-decline">
                      {analysis.baseDecline > 0 ? '+' : ''}{analysis.baseDecline}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">5-week historical average</div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Sentiment Impact</span>
                    <span className={`text-sm ${analysis.sentimentImpact < 0 ? 'text-red-600' : 'text-secondary'}`} data-testid="text-sentiment-impact">
                      {analysis.sentimentImpact > 0 ? '+' : ''}{analysis.sentimentImpact}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">News sentiment analysis</div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Volume Anomaly</span>
                    <span className={`text-sm ${analysis.volumeImpact < 0 ? 'text-red-600' : 'text-secondary'}`} data-testid="text-volume-impact">
                      {analysis.volumeImpact > 0 ? '+' : ''}{analysis.volumeImpact}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">Trading volume deviation</div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Technical Indicators</span>
                    <span className={`text-sm ${analysis.technicalImpact < 0 ? 'text-red-600' : 'text-secondary'}`} data-testid="text-technical-impact">
                      {analysis.technicalImpact > 0 ? '+' : ''}{analysis.technicalImpact}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">RSI & Bollinger Bands</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confidence & Risk Panel */}
      <div className="space-y-6">
        {/* Confidence Meter */}
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-slate-900 mb-4">Confidence Analysis</h4>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Overall Confidence</span>
                <span className="font-medium" data-testid="text-confidence-score">{analysis.confidenceLevel}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-warning h-3 rounded-full" 
                  style={{ width: `${analysis.confidenceLevel}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Data Quality</span>
                <span className="text-secondary font-medium">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">News Coverage</span>
                <span className="text-warning font-medium">
                  {Array.isArray(analysis.newsArticles) && analysis.newsArticles.length >= 5 ? 'High' : 'Medium'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Market Volatility</span>
                <span className="text-danger font-medium">
                  {Math.abs(analysis.predictionPercentage) > 5 ? 'High' : 'Medium'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Stock Info */}
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-slate-900 mb-4">Current Stock Info</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Current Price</span>
                <span className="font-semibold" data-testid="text-current-price">
                  ${analysis.currentPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Daily Change</span>
                <span className={`font-medium ${analysis.dailyChange < 0 ? 'text-red-600' : 'text-secondary'}`} data-testid="text-daily-change">
                  {analysis.dailyChange > 0 ? '+' : ''}{analysis.dailyChange}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Volume</span>
                <span className="text-slate-900" data-testid="text-volume">{analysis.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Market Cap</span>
                <span className="text-slate-900" data-testid="text-market-cap">{analysis.marketCap}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
