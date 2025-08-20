import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="text-red-600 w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Important Risk Disclaimer</h3>
          <div className="text-sm text-red-800 space-y-2">
            <p>
              <strong>This is not financial advice.</strong> The predictions provided by this tool are for informational purposes only and should not be used as the sole basis for investment decisions.
            </p>
            <p>
              <strong>Past performance does not guarantee future results.</strong> Stock markets are inherently volatile and unpredictable. All investments carry risk of loss.
            </p>
            <p>
              <strong>Consult a licensed financial advisor</strong> before making any investment decisions. This tool uses automated analysis and may contain errors or biases.
            </p>
            <p>
              <strong>No warranty provided.</strong> We make no guarantees about the accuracy or reliability of these predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
