import { PrintJob, CostBreakdown, AIInsights } from '@/types';

export interface SavedQuote {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  job_data: PrintJob;
  breakdown_data: CostBreakdown;
  insights_data: AIInsights;
  total_cost: number;
  status?: 'draft' | 'sent' | 'accepted' | 'rejected';
}

// Mock data storage (in-memory for demo purposes)
let mockQuotes: SavedQuote[] = [
  {
    id: '1',
    created_at: '2025-01-01T10:00:00Z',
    updated_at: '2025-01-01T10:00:00Z',
    name: 'Sample Phone Case',
    job_data: {
      id: '1',
      name: 'Sample Phone Case',
      printTime: 3.5,
      filamentType: 'PLA',
      filamentCostPerKg: 25,
      filamentWeight: 45,
      printerName: 'Ender 3 V2',
      electricityCostPerHour: 0.12,
      powerConsumption: 270,
      laborRate: 15,
      maintenanceBuffer: 10,
      packagingCost: 2,
      shippingCost: 8,
      markup: 30
    },
    breakdown_data: {
      materialCost: 1.125,
      powerCost: 0.113,
      laborCost: 52.5,
      maintenanceCost: 5.374,
      packagingCost: 2,
      shippingCost: 8,
      subtotal: 69.112,
      markupAmount: 20.734,
      total: 89.846
    },
    insights_data: {
      riskLevel: 'low',
      riskPercentage: 8,
      failureReasons: ['Model appears suitable for reliable printing'],
      recommendedBuffer: 0,
      alternativeFilaments: []
    },
    total_cost: 89.846,
    status: 'draft'
  }
];

let mockFilamentPresets = [
  {
    id: '1',
    created_at: '2025-01-01T00:00:00Z',
    name: 'PLA Premium',
    cost_per_kg: 28,
    density: 1.24,
    print_temp: 210,
    bed_temp: 60,
    properties: ['Easy to print', 'Biodegradable', 'Low odor', 'Premium quality'],
    is_default: false
  },
  {
    id: '2',
    created_at: '2025-01-01T00:00:00Z',
    name: 'ABS Professional',
    cost_per_kg: 32,
    density: 1.04,
    print_temp: 250,
    bed_temp: 100,
    properties: ['Industrial grade', 'Heat resistant', 'Chemical resistant', 'Durable'],
    is_default: false
  }
];

// Mock database operations
export const mockDatabase = {
  quotes: {
    async select() {
      return { data: mockQuotes, error: null };
    },

    async insert(quote: Omit<SavedQuote, 'id' | 'created_at' | 'updated_at'>) {
      const newQuote: SavedQuote = {
        ...quote,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockQuotes.push(newQuote);
      return { data: [newQuote], error: null };
    },

    async update(id: string, updates: Partial<SavedQuote>) {
      const index = mockQuotes.findIndex(q => q.id === id);
      if (index === -1) {
        return { data: null, error: { message: 'Quote not found' } };
      }
      
      mockQuotes[index] = {
        ...mockQuotes[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      return { data: [mockQuotes[index]], error: null };
    },

    async delete(id: string) {
      const index = mockQuotes.findIndex(q => q.id === id);
      if (index === -1) {
        return { data: null, error: { message: 'Quote not found' } };
      }
      
      const deleted = mockQuotes.splice(index, 1);
      return { data: deleted, error: null };
    }
  },

  filament_presets: {
    async select() {
      return { data: mockFilamentPresets, error: null };
    },

    async insert(preset: Omit<typeof mockFilamentPresets[0], 'id' | 'created_at'>) {
      const newPreset = {
        ...preset,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      mockFilamentPresets.push(newPreset);
      return { data: [newPreset], error: null };
    }
  }
};