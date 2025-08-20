import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { stockRequestSchema, type StockRequest, type StockAnalysis } from "@shared/schema";
import { stockApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Search, BarChart } from "lucide-react";

interface StockInputProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (analysis: StockAnalysis) => void;
}

export function StockInput({ onAnalysisStart, onAnalysisComplete }: StockInputProps) {
  const { toast } = useToast();
  
  const form = useForm<StockRequest>({
    resolver: zodResolver(stockRequestSchema),
    defaultValues: {
      ticker: "",
      analysisType: "standard",
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: stockApi.analyzeStock,
    onMutate: () => {
      onAnalysisStart();
    },
    onSuccess: (data) => {
      onAnalysisComplete(data);
      toast({
        title: "Analysis Complete",
        description: `Stock analysis for ${data.ticker} has been completed.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze stock",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StockRequest) => {
    analyzeMutation.mutate(data);
  };

  const handleClear = () => {
    form.reset();
  };

  return (
    <div className="mb-8">
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Stock Analysis Input</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ticker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Stock Ticker Symbol
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="e.g., AAPL, TSLA, MSFT"
                            className="uppercase pr-10"
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            data-testid="input-ticker"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <Search className="text-slate-400 w-4 h-4" />
                          </div>
                        </div>
                      </FormControl>
                      <p className="text-xs text-slate-500">Enter a valid stock ticker symbol (NYSE, NASDAQ)</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="analysisType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Analysis Depth
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-analysis-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard Analysis</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                          <SelectItem value="quick">Quick Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={analyzeMutation.isPending}
                  className="flex-1 bg-primary text-white hover:bg-blue-700 transition-colors"
                  data-testid="button-analyze"
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  {analyzeMutation.isPending ? "Analyzing..." : "Analyze Stock"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  data-testid="button-clear"
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
