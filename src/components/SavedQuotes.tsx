import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  History, 
  Trash2, 
  Edit, 
  Calendar,
} from 'lucide-react';
import { db, SavedQuote } from '@/lib/database';
import { PrintJob, CostBreakdown, AIInsights } from '@/types';
import { formatCurrency, formatTime } from '@/utils/calculations';
import { toast } from '@/hooks/use-toast';
import { trackEvent } from './Analytics';

interface SavedQuotesProps {
  currentJob?: PrintJob;
  currentBreakdown?: CostBreakdown;
  currentInsights?: AIInsights;
  onLoadQuote?: (job: PrintJob) => void;
}

export function SavedQuotes({ 
  currentJob, 
  currentBreakdown, 
  currentInsights, 
  onLoadQuote 
}: SavedQuotesProps) {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.quotes.getAll();
      if (error) {
        console.error('Error loading quotes:', error);
        toast({
          title: "Error",
          description: "Failed to load saved quotes",
          variant: "destructive"
        });
      } else {
        setQuotes(data || []);
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentQuote = async () => {
    if (!currentJob || !currentBreakdown || !currentInsights) {
      toast({
        title: "Nothing to Save",
        description: "Please configure a quote first",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await db.quotes.save({
        name: currentJob.name || `Quote ${Date.now()}`,
        job_data: currentJob,
        breakdown_data: currentBreakdown,
        insights_data: currentInsights,
        total_cost: currentBreakdown.total,
        status: 'draft'
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Quote Saved",
        description: "Your quote has been saved successfully"
      });

      trackEvent('quote_saved', {
        total_cost: currentBreakdown.total,
        filament_type: currentJob.filamentType
      });

      loadQuotes();
    } catch (error) {
      console.error('Error saving quote:', error);
      toast({
        title: "Error",
        description: "Failed to save quote",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      const { error } = await db.quotes.delete(id);
      if (error) {
        throw error;
      }

      toast({
        title: "Quote Deleted",
        description: "Quote has been deleted successfully"
      });

      trackEvent('quote_deleted');
      loadQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive"
      });
    }
  };

  const loadQuote = (quote: SavedQuote) => {
    if (onLoadQuote) {
      onLoadQuote(quote.job_data);
      toast({
        title: "Quote Loaded",
        description: `Loaded "${quote.name}"`
      });

      trackEvent('quote_loaded', {
        quote_id: quote.id,
        total_cost: quote.total_cost
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Saved Quotes
          </div>
          <Button
            onClick={saveCurrentQuote}
            disabled={saving || !currentJob}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Current'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading quotes...
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No saved quotes yet. Save your first quote to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">{quote.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(quote.created_at).toLocaleDateString()}</span>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(quote.status ?? 'draft')}
                      >
                        {quote.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">
                      {formatCurrency(quote.total_cost)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(quote.job_data.printTime)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">
                      {quote.job_data.filamentType}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {quote.job_data.printerName}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadQuote(quote)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteQuote(quote.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}