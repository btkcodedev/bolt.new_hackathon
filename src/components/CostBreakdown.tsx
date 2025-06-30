import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Zap, 
  User, 
  Wrench, 
  Package, 
  Truck, 
  TrendingUp,
  PieChart
} from 'lucide-react';
import { CostBreakdown as CostBreakdownType } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface CostBreakdownProps {
  breakdown: CostBreakdownType;
}

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const costItems = [
    {
      label: 'Material',
      amount: breakdown.materialCost,
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      label: 'Power',
      amount: breakdown.powerCost,
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      label: 'Labor',
      amount: breakdown.laborCost,
      icon: User,
      color: 'bg-green-500'
    },
    {
      label: 'Maintenance',
      amount: breakdown.maintenanceCost,
      icon: Wrench,
      color: 'bg-orange-500'
    },
    {
      label: 'Packaging',
      amount: breakdown.packagingCost,
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      label: 'Shipping',
      amount: breakdown.shippingCost,
      icon: Truck,
      color: 'bg-pink-500'
    }
  ];

  const maxAmount = Math.max(...costItems.map(item => item.amount));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {costItems.map((item, index) => {
            const percentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
            const Icon = item.icon;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <Badge variant="secondary">
                    {formatCurrency(item.amount)}
                  </Badge>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatCurrency(breakdown.subtotal)}</span>
            </div>
            
            <div className="flex items-center justify-between text-green-600">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Markup</span>
              </div>
              <span>+{formatCurrency(breakdown.markupAmount)}</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between text-2xl font-bold text-primary">
              <span>Total</span>
              <span>{formatCurrency(breakdown.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {costItems.map((item, index) => {
              const percentage = breakdown.subtotal > 0 
                ? ((item.amount / breakdown.subtotal) * 100) 
                : 0;
              
              if (percentage < 1) return null;
              
              return (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-medium">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}