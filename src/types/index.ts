export interface PrintJob {
  id: string;
  name: string;
  file?: File;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    volume: number;
  };
  printTime: number; // in hours
  filamentType: string;
  filamentCostPerKg: number;
  filamentWeight: number; // in grams
  printerName: string;
  electricityCostPerHour: number;
  powerConsumption: number; // in watts
  laborRate: number; // per hour
  maintenanceBuffer: number; // percentage
  packagingCost: number;
  shippingCost: number;
  markup: number; // percentage
}

export interface CostBreakdown {
  materialCost: number;
  powerCost: number;
  laborCost: number;
  maintenanceCost: number;
  packagingCost: number;
  shippingCost: number;
  subtotal: number;
  markupAmount: number;
  total: number;
}

export interface AIInsights {
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
  failureReasons: string[];
  recommendedBuffer: number;
  alternativeFilaments: {
    name: string;
    costPerKg: number;
    benefits: string[];
    savings: number;
  }[];
}

export interface FilamentType {
  name: string;
  costPerKg: number;
  density: number; // g/cm³
  printTemp: number;
  bedTemp: number;
  properties: string[];
}