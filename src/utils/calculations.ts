import { PrintJob, CostBreakdown, AIInsights } from '@/types';
import { filamentTypes } from '@/data/filaments';

export function calculateCosts(job: PrintJob): CostBreakdown {
  // Material cost calculation
  const materialCost = (job.filamentWeight / 1000) * job.filamentCostPerKg;
  
  // Power cost calculation
  const powerCost = (job.powerConsumption / 1000) * job.printTime * job.electricityCostPerHour;
  
  // Labor cost calculation
  const laborCost = job.printTime * job.laborRate;
  
  // Maintenance cost calculation
  const maintenanceCost = (materialCost + powerCost + laborCost) * (job.maintenanceBuffer / 100);
  
  // Subtotal before markup
  const subtotal = materialCost + powerCost + laborCost + maintenanceCost + job.packagingCost + job.shippingCost;
  
  // Markup calculation
  const markupAmount = subtotal * (job.markup / 100);
  
  // Total cost
  const total = subtotal + markupAmount;

  return {
    materialCost,
    powerCost,
    laborCost,
    maintenanceCost,
    packagingCost: job.packagingCost,
    shippingCost: job.shippingCost,
    subtotal,
    markupAmount,
    total
  };
}

export function generateAIInsights(job: PrintJob): AIInsights {
  // Simulate AI analysis based on job parameters
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let riskPercentage = 5;
  const failureReasons: string[] = [];
  let recommendedBuffer = 0;

  // Analyze dimensions for risk factors
  if (job.dimensions) {
    const { length, width, height, volume } = job.dimensions;
    const aspectRatio = Math.max(length, width) / height;
    
    if (aspectRatio > 10) {
      riskLevel = 'high';
      riskPercentage = 25;
      failureReasons.push('High aspect ratio may cause warping and adhesion issues');
      recommendedBuffer = 15;
    } else if (height > 150) {
      riskLevel = 'medium';
      riskPercentage = 15;
      failureReasons.push('Tall prints are prone to layer shifting and vibration issues');
      recommendedBuffer = 10;
    }

    if (volume > 500000) { // 500cm³
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
      riskPercentage = Math.max(riskPercentage, 12);
      failureReasons.push('Large volume prints have higher chance of print failures');
      recommendedBuffer = Math.max(recommendedBuffer, 8);
    }
  }

  // Analyze print time
  if (job.printTime > 24) {
    riskLevel = riskLevel === 'high' ? 'high' : 'medium';
    riskPercentage = Math.max(riskPercentage, 18);
    failureReasons.push('Long print times increase probability of mechanical failures');
    recommendedBuffer = Math.max(recommendedBuffer, 12);
  }

  // Generate alternative filament recommendations
  const alternativeFilaments = filamentTypes
    .filter(f => f.name !== job.filamentType)
    .map(f => {
      const savings = ((job.filamentCostPerKg - f.costPerKg) / job.filamentCostPerKg) * 100;
      return {
        name: f.name,
        costPerKg: f.costPerKg,
        benefits: f.properties.slice(0, 2),
        savings: Math.round(savings * 100) / 100
      };
    })
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 3);

  if (failureReasons.length === 0) {
    failureReasons.push('Model appears suitable for reliable printing');
  }

  return {
    riskLevel,
    riskPercentage,
    failureReasons,
    recommendedBuffer,
    alternativeFilaments
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams.toFixed(0)} g`;
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) {
    return `${m}m`;
  }
  if (m === 0) {
    return `${h}h`;
  }
  return `${h}h ${m}m`;
}