import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Zap
} from 'lucide-react';
import { AIInsights as AIInsightsType } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface AIInsightsProps {
  insights: AIInsightsType;
  onFilamentSwap?: (filamentName: string, costPerKg: number) => void;
}

export function AIInsights({ insights, onFilamentSwap }: AIInsightsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const RiskIcon = getRiskIcon(insights.riskLevel);

  return (
    <div className="space-y-6">
      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RiskIcon className="h-6 w-6" />
              <div>
                <h3 className="font-semibold capitalize">
                  {insights.riskLevel} Risk
                </h3>
                <p className="text-sm text-muted-foreground">
                  {insights.riskPercentage}% chance of print failure
                </p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={getRiskColor(insights.riskLevel)}
            >
              {insights.riskLevel.toUpperCase()}
            </Badge>
          </div>

          {insights.recommendedBuffer > 0 && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                Consider adding a {insights.recommendedBuffer}% buffer to account for potential failures and reprints.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Analysis Factors:</h4>
            <ul className="space-y-1">
              {insights.failureReasons.map((reason, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Smart Filament Recommendations */}
      {insights.alternativeFilaments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Smart Filament Alternatives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.alternativeFilaments.map((filament, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{filament.name}</h4>
                    <Badge variant="outline">
                      {formatCurrency(filament.costPerKg)}/kg
                    </Badge>
                    {filament.savings > 0 && (
                      <Badge variant="secondary" className="text-green-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {filament.savings.toFixed(1)}% savings
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {filament.benefits.map((benefit, benefitIndex) => (
                      <Badge 
                        key={benefitIndex} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                {onFilamentSwap && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFilamentSwap(filament.name, filament.costPerKg)}
                    className="ml-4"
                  >
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Switch
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}