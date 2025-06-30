import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Share2, 
  FileText, 
  Copy,
  Mail
} from 'lucide-react';
import { PrintJob, CostBreakdown, AIInsights } from '@/types';
import { formatCurrency, formatTime, formatWeight } from '@/utils/calculations';
import { toast } from '@/hooks/use-toast';

interface ExportQuoteProps {
  job: PrintJob;
  breakdown: CostBreakdown;
  insights: AIInsights;
}

export function ExportQuote({ job, breakdown, insights }: ExportQuoteProps) {
  const generateQuoteData = () => {
    return {
      quoteId: `QT-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      job,
      breakdown,
      insights
    };
  };

  const handleDownloadPDF = async () => {
    const quoteData = generateQuoteData();
    
    // Create a formatted text representation for now
    // In a real implementation, you'd use a PDF library like jsPDF
    const content = `
3D PRINTING QUOTE
Quote ID: ${quoteData.quoteId}
Date: ${quoteData.date}

PROJECT DETAILS
Name: ${job.name}
Print Time: ${formatTime(job.printTime)}
Filament: ${job.filamentType} (${formatWeight(job.filamentWeight)})
Printer: ${job.printerName}

COST BREAKDOWN
Material: ${formatCurrency(breakdown.materialCost)}
Power: ${formatCurrency(breakdown.powerCost)}
Labor: ${formatCurrency(breakdown.laborCost)}
Maintenance: ${formatCurrency(breakdown.maintenanceCost)}
Packaging: ${formatCurrency(breakdown.packagingCost)}
Shipping: ${formatCurrency(breakdown.shippingCost)}

Subtotal: ${formatCurrency(breakdown.subtotal)}
Markup: ${formatCurrency(breakdown.markupAmount)}
TOTAL: ${formatCurrency(breakdown.total)}

AI RISK ASSESSMENT
Risk Level: ${insights.riskLevel.toUpperCase()}
Failure Probability: ${insights.riskPercentage}%
${insights.recommendedBuffer > 0 ? `Recommended Buffer: ${insights.recommendedBuffer}%` : ''}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quote-${quoteData.quoteId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Quote Downloaded",
      description: "Your quote has been downloaded successfully."
    });
  };

  const handleShareQuote = async () => {
    const quoteData = generateQuoteData();
    const shareUrl = `${window.location.origin}/quote/${quoteData.quoteId}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Quote link copied to clipboard."
      });
    } catch (err) {
      toast({
        title: "Share Link",
        description: shareUrl,
        variant: "default"
      });
    }
  };

  const handleEmailQuote = () => {
    const quoteData = generateQuoteData();
    const subject = `3D Printing Quote - ${job.name}`;
    const body = `
Hi,

Please find your 3D printing quote below:

Project: ${job.name}
Total Cost: ${formatCurrency(breakdown.total)}
Print Time: ${formatTime(job.printTime)}

View full quote: ${window.location.origin}/quote/${quoteData.quoteId}

Best regards,
Your 3D Printing Service
    `;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Export Quote
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quote Summary */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Quote Summary</span>
            <Badge variant="outline">
              QT-{Date.now().toString().slice(-6)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Project:</span>
              <p className="font-medium">{job.name || 'Untitled'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total:</span>
              <p className="font-bold text-lg text-primary">
                {formatCurrency(breakdown.total)}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Print Time:</span>
              <p className="font-medium">{formatTime(job.printTime)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Risk Level:</span>
              <Badge 
                variant="secondary"
                className={
                  insights.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                  insights.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {insights.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleShareQuote}
            className="flex items-center justify-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Link
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleEmailQuote}
            className="flex items-center justify-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Quote
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost">
              <Copy className="h-3 w-3 mr-1" />
              Copy Details
            </Button>
            <Button size="sm" variant="ghost">
              Save Template
            </Button>
            <Button size="sm" variant="ghost">
              Create Invoice
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}