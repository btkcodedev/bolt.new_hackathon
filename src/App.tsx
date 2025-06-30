import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { QuoteForm } from '@/components/QuoteForm';
import { CostBreakdown } from '@/components/CostBreakdown';
import { AIInsights } from '@/components/AIInsights';
import { ExportQuote } from '@/components/ExportQuote';
import { SavedQuotes } from '@/components/SavedQuotes';
import { SEO } from '@/components/SEO';
import { Analytics } from '@/components/Analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, Bot, FileText, BarChart3, History } from 'lucide-react';
import { PrintJob, CostBreakdown as CostBreakdownType, AIInsights as AIInsightsType } from '@/types';
import { calculateCosts, generateAIInsights } from '@/utils/calculations';
import { env } from '@/config/env';
import { trackEvent, trackPageView } from '@/components/Analytics';

function App() {
  const [job, setJob] = useState<PrintJob>({
    id: '1',
    name: '',
    printTime: 4,
    filamentType: 'PLA',
    filamentCostPerKg: 25,
    filamentWeight: 50,
    printerName: 'Ender 3 V2',
    electricityCostPerHour: 0.12,
    powerConsumption: 270,
    laborRate: 15,
    maintenanceBuffer: 10,
    packagingCost: 2,
    shippingCost: 8,
    markup: 30
  });

  const [breakdown, setBreakdown] = useState<CostBreakdownType>({
    materialCost: 0,
    powerCost: 0,
    laborCost: 0,
    maintenanceCost: 0,
    packagingCost: 0,
    shippingCost: 0,
    subtotal: 0,
    markupAmount: 0,
    total: 0
  });

  const [insights, setInsights] = useState<AIInsightsType>({
    riskLevel: 'low',
    riskPercentage: 5,
    failureReasons: ['Model appears suitable for reliable printing'],
    recommendedBuffer: 0,
    alternativeFilaments: []
  });

  useEffect(() => {
    // Track initial page view
    trackPageView('/', 'Home - PrintQuote Pro');
  }, []);

  useEffect(() => {
    const newBreakdown = calculateCosts(job);
    const newInsights = generateAIInsights(job);
    
    setBreakdown(newBreakdown);
    setInsights(newInsights);

    // Track quote calculation
    trackEvent('quote_calculated', {
      total_cost: newBreakdown.total,
      filament_type: job.filamentType,
      print_time: job.printTime,
      risk_level: newInsights.riskLevel
    });
  }, [job]);

  const handleFilamentSwap = (filamentName: string, costPerKg: number) => {
    setJob(prev => ({
      ...prev,
      filamentType: filamentName,
      filamentCostPerKg: costPerKg
    }));

    trackEvent('filament_swapped', {
      from_filament: job.filamentType,
      to_filament: filamentName,
      cost_difference: costPerKg - job.filamentCostPerKg
    });
  };

  const handleLoadQuote = (loadedJob: PrintJob) => {
    setJob(loadedJob);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SEO />
      <Analytics />
      
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Calculator className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{env.APP_NAME}</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered 3D Printing Calculator</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {env.ENABLE_AI_INSIGHTS && (
                  <Badge variant="secondary" className="hidden md:inline-flex">
                    <Bot className="h-3 w-3 mr-1" />
                    Created with bolt.new | Project submitted for World's largest hackathon | By btkcodedev
                  </Badge>
                )}
                {env.ENABLE_DATABASE && (
                  <Badge variant="outline" className="hidden md:inline-flex">
                    <History className="h-3 w-3 mr-1" />
                    Database Connected
                  </Badge>
                )}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Quote Form */}
              <div className="lg:col-span-2">
                <QuoteForm job={job} onJobUpdate={setJob} />
              </div>

              {/* Right Column - Results */}
              <div className="space-y-6">
                <Tabs defaultValue="breakdown" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="breakdown" className="text-xs">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Costs
                    </TabsTrigger>
                    {env.ENABLE_AI_INSIGHTS && (
                      <TabsTrigger value="insights" className="text-xs">
                        <Bot className="h-4 w-4 mr-1" />
                        AI
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="export" className="text-xs">
                      <FileText className="h-4 w-4 mr-1" />
                      Export
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="text-xs">
                      <History className="h-4 w-4 mr-1" />
                      Saved
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="breakdown" className="mt-4">
                    <CostBreakdown breakdown={breakdown} />
                  </TabsContent>

                  {env.ENABLE_AI_INSIGHTS && (
                    <TabsContent value="insights" className="mt-4">
                      <AIInsights 
                        insights={insights} 
                        onFilamentSwap={handleFilamentSwap}
                      />
                    </TabsContent>
                  )}

                  <TabsContent value="export" className="mt-4">
                    <ExportQuote 
                      job={job}
                      breakdown={breakdown}
                      insights={insights}
                    />
                  </TabsContent>

                  <TabsContent value="saved" className="mt-4">
                    <SavedQuotes
                      currentJob={job}
                      currentBreakdown={breakdown}
                      currentInsights={insights}
                      onLoadQuote={handleLoadQuote}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50 flex items-center justify-center">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">{env.APP_NAME}</h3>
                <p className="text-sm text-muted-foreground">
                  Professional 3D printing quote calculator with AI-powered insights for accurate pricing and risk assessment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Accurate cost calculations</li>
                  {env.ENABLE_AI_INSIGHTS && <li>• AI risk assessment</li>}
                  <li>• Smart material recommendations</li>
                  <li>• Professional quote export</li>
                  {env.ENABLE_DATABASE && <li>• Quote history & templates</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• STL & 3MF file support</li>
                  <li>• Mobile responsive design</li>
                  <li>• Dark/Light theme toggle</li>
                  <li>• PDF export capability</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
              © 2025 {env.APP_NAME}. Built with React, TypeScript, and AI insights by{' '}
              <a 
                href="https://github.com/btkcodedev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                btkcodedev
              </a>
            </div>
          </div>
        </footer>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
