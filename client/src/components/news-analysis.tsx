import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StockAnalysis, NewsArticle } from "@shared/schema";

interface NewsAnalysisProps {
  analysis: StockAnalysis;
}

export function NewsAnalysis({ analysis }: NewsAnalysisProps) {
  const articles = Array.isArray(analysis.newsArticles) ? analysis.newsArticles : [];
  
  const getSentimentColor = (sentiment: number) => {
    if (sentiment < -3) return "border-red-400";
    if (sentiment < 0) return "border-yellow-400";
    return "border-green-400";
  };

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment < -3) return { text: "Negative", class: "bg-red-100 text-red-800" };
    if (sentiment < 0) return { text: "Neutral", class: "bg-yellow-100 text-yellow-800" };
    return { text: "Positive", class: "bg-green-100 text-green-800" };
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const getSentimentScoreWidth = () => {
    // Convert sentiment score (-10 to +10) to percentage (0 to 100)
    const normalizedScore = ((analysis.sentimentScore + 10) / 20) * 100;
    return Math.max(0, Math.min(100, normalizedScore));
  };

  const getSentimentGradient = () => {
    if (analysis.sentimentScore < -3) return "bg-gradient-to-r from-red-500 to-red-400";
    if (analysis.sentimentScore < 0) return "bg-gradient-to-r from-yellow-500 to-yellow-400";
    return "bg-gradient-to-r from-green-500 to-green-400";
  };

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">News Sentiment Analysis</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Sentiment Score</span>
            <span className="text-lg font-bold text-red-600" data-testid="text-sentiment-score">
              {analysis.sentimentScore.toFixed(1)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getSentimentGradient()}`}
              style={{ width: `${getSentimentScoreWidth()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Very Negative</span>
            <span>Neutral</span>
            <span>Very Positive</span>
          </div>
        </div>

        <div className="space-y-4">
          {articles.length > 0 ? (
            articles.slice(0, 3).map((article: NewsArticle, index) => {
              const badge = getSentimentBadge(article.sentiment);
              
              return (
                <div 
                  key={index}
                  className={`border-l-4 ${getSentimentColor(article.sentiment)} pl-4 py-2`}
                  data-testid={`article-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm mb-1">{article.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">
                        {article.source} • {formatTimeAgo(article.publishedAt)} • Sentiment: {article.sentiment.toFixed(1)}
                      </p>
                      <p className="text-sm text-slate-700">{article.summary}</p>
                    </div>
                    <span className={`${badge.class} text-xs px-2 py-1 rounded-full ml-2 whitespace-nowrap`}>
                      {badge.text}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No news articles available for analysis</p>
            </div>
          )}
        </div>

        {articles.length > 0 && (
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              className="text-primary hover:underline"
              data-testid="button-view-all-news"
            >
              View All News Sources ({articles.length} articles analyzed)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
