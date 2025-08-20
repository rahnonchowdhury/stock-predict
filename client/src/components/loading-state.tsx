import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, Circle } from "lucide-react";

export function LoadingState() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Market Data Retrieved", icon: CheckCircle, status: "complete" },
    { label: "Analyzing News Sentiment", icon: Loader2, status: "active" },
    { label: "Calculating Prediction", icon: Circle, status: "pending" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 95);
        
        // Update current step based on progress
        if (newProgress > 70 && currentStep < 2) {
          setCurrentStep(2);
        } else if (newProgress > 35 && currentStep < 1) {
          setCurrentStep(1);
        }
        
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [currentStep]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "complete";
    if (index === currentStep) return "active";
    return "pending";
  };

  const getStepIcon = (index: number) => {
    const status = getStepStatus(index);
    switch (status) {
      case "complete":
        return CheckCircle;
      case "active":
        return Loader2;
      default:
        return Circle;
    }
  };

  const getStepColor = (index: number) => {
    const status = getStepStatus(index);
    switch (status) {
      case "complete":
        return "text-secondary";
      case "active":
        return "text-warning";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="mb-8">
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Stock Data</h3>
            <p className="text-slate-600 mb-4">Processing market data, news sentiment, and technical indicators...</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span data-testid="text-progress">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {steps.map((step, index) => {
                const Icon = getStepIcon(index);
                const color = getStepColor(index);
                const isActive = getStepStatus(index) === "active";
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center justify-center space-x-2 ${color}`}
                    data-testid={`status-step-${index}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`} />
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
