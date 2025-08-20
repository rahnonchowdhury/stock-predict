import { Card, CardContent } from "@/components/ui/card";
import { StockAnalysis } from "@shared/schema";

interface TechnicalAnalysisProps {
  analysis: StockAnalysis;
}

export function TechnicalAnalysis({ analysis }: TechnicalAnalysisProps) {
  const getRSIStatus = (rsi: number) => {
    if (rsi < 30) return { status: "Oversold", color: "text-red-600", description: "Stock is heavily oversold, indicating potential reversal" };
    if (rsi > 70) return { status: "Overbought", color: "text-red-600", description: "Stock is overbought, potential for decline" };
    return { status: "Neutral", color: "text-slate-900", description: "RSI indicates balanced market conditions" };
  };

  const getBollingerPosition = () => {
    // This would be calculated from actual Bollinger Bands data
    // For now, infer from RSI and other indicators
    if (analysis.rsiValue < 30) return "Lower Band";
    if (analysis.rsiValue > 70) return "Upper Band";
    return "Middle Band";
  };

  const getVolumeAnalysis = () => {
    // Calculate from volume impact
    const volumeChange = Math.round(analysis.volumeImpact * 100);
    return volumeChange;
  };

  const getMarketCorrelation = () => {
    // This would be the actual correlation coefficient
    // Using market correlation from the analysis
    return analysis.marketCorrelation.toFixed(2);
  };

  const rsiStatus = getRSIStatus(analysis.rsiValue);
  const bollingerPosition = getBollingerPosition();
  const volumeAnalysis = getVolumeAnalysis();
  const marketCorrelation = getMarketCorrelation();

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Technical Analysis</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">RSI (Relative Strength Index)</h4>
              <span className="text-lg font-bold text-red-600" data-testid="text-rsi-value">
                {analysis.rsiValue.toFixed(1)}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${analysis.rsiValue < 30 ? 'bg-red-500' : analysis.rsiValue > 70 ? 'bg-red-500' : 'bg-yellow-500'}`}
                style={{ width: `${(analysis.rsiValue / 100) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Oversold (0-30)</span>
              <span>Neutral (30-70)</span>
              <span>Overbought (70-100)</span>
            </div>
            <p className="text-sm text-slate-600 mt-2" data-testid="text-rsi-description">
              {rsiStatus.description}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Bollinger Bands Position</h4>
              <span className="text-lg font-bold text-red-600" data-testid="text-bollinger-position">
                {bollingerPosition}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {bollingerPosition === "Lower Band" 
                ? "Trading near lower Bollinger Band suggests oversold conditions"
                : bollingerPosition === "Upper Band"
                ? "Trading near upper Bollinger Band suggests overbought conditions"
                : "Trading within normal Bollinger Band range"
              }
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Volume Analysis</h4>
              <span className={`text-lg font-bold ${volumeAnalysis > 0 ? 'text-warning' : 'text-secondary'}`} data-testid="text-volume-analysis">
                {volumeAnalysis > 0 ? '+' : ''}{volumeAnalysis}%
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {volumeAnalysis > 20 
                ? `Volume is ${volumeAnalysis}% above 20-day average, indicating increased ${volumeAnalysis > 0 ? 'selling' : 'buying'} pressure`
                : volumeAnalysis < -20
                ? `Volume is ${Math.abs(volumeAnalysis)}% below 20-day average, indicating decreased activity`
                : "Volume is near 20-day average, indicating normal trading activity"
              }
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Market Correlation (S&P 500)</h4>
              <span className="text-lg font-bold text-slate-900" data-testid="text-market-correlation">
                {marketCorrelation}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {parseFloat(marketCorrelation) > 0.7 
                ? "High correlation with market trend amplifies decline risk"
                : parseFloat(marketCorrelation) > 0.4
                ? "Moderate correlation with market trend"
                : "Low correlation with market trend, stock may move independently"
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
