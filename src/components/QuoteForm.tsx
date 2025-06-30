import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Ruler, Clock, Zap, Package } from 'lucide-react';
import { PrintJob } from '@/types';
import { filamentTypes, printers } from '@/data/filaments';
import { FileUpload } from './FileUpload';

interface QuoteFormProps {
  onJobUpdate: (job: PrintJob) => void;
  job: PrintJob;
}

export function QuoteForm({ onJobUpdate, job }: QuoteFormProps) {
  const [showManualInput, setShowManualInput] = useState(false);

  const updateJob = (updates: Partial<PrintJob>) => {
    onJobUpdate({ ...job, ...updates });
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      updateJob({ 
        file, 
        name: file.name.replace(/\.[^/.]+$/, "")
      });
      setShowManualInput(false);
    } else {
      updateJob({ file: undefined });
    }
  };

  const calculateVolume = () => {
    if (job.dimensions) {
      const { length, width, height } = job.dimensions;
      const volume = (length * width * height) / 1000; // Convert mm³ to cm³
      updateJob({
        dimensions: { ...job.dimensions, volume }
      });
    }
  };

  const handleFilamentChange = (filamentName: string) => {
    const filament = filamentTypes.find(f => f.name === filamentName);
    if (filament) {
      updateJob({
        filamentType: filamentName,
        filamentCostPerKg: filament.costPerKg
      });
    }
  };

  const handlePrinterChange = (printerName: string) => {
    const printer = printers.find(p => p.name === printerName);
    if (printer) {
      updateJob({
        printerName,
        powerConsumption: printer.powerConsumption
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Model Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload onFileSelect={handleFileSelect} />
          
          <div className="flex items-center justify-center">
            <Separator className="flex-1" />
            <span className="px-4 text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowManualInput(!showManualInput)}
            className="w-full"
          >
            <Ruler className="h-4 w-4 mr-2" />
            Enter Dimensions Manually
          </Button>

          {(showManualInput || !job.file) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <Label htmlFor="length">Length (mm)</Label>
                <Input
                  id="length"
                  type="number"
                  value={job.dimensions?.length || ''}
                  onChange={(e) => updateJob({
                    dimensions: {
                      ...job.dimensions,
                      length: parseFloat(e.target.value) || 0,
                      width: job.dimensions?.width || 0,
                      height: job.dimensions?.height || 0,
                      volume: job.dimensions?.volume || 0
                    }
                  })}
                  onBlur={calculateVolume}
                />
              </div>
              <div>
                <Label htmlFor="width">Width (mm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={job.dimensions?.width || ''}
                  onChange={(e) => updateJob({
                    dimensions: {
                      ...job.dimensions,
                      length: job.dimensions?.length || 0,
                      width: parseFloat(e.target.value) || 0,
                      height: job.dimensions?.height || 0,
                      volume: job.dimensions?.volume || 0
                    }
                  })}
                  onBlur={calculateVolume}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={job.dimensions?.height || ''}
                  onChange={(e) => updateJob({
                    dimensions: {
                      ...job.dimensions,
                      length: job.dimensions?.length || 0,
                      width: job.dimensions?.width || 0,
                      height: parseFloat(e.target.value) || 0,
                      volume: job.dimensions?.volume || 0
                    }
                  })}
                  onBlur={calculateVolume}
                />
              </div>
              <div>
                <Label htmlFor="volume">Volume (cm³)</Label>
                <Input
                  id="volume"
                  type="number"
                  step="0.01"
                  value={job.dimensions?.volume || ''}
                  onChange={(e) => updateJob({
                    dimensions: {
                      ...job.dimensions,
                      length: job.dimensions?.length || 0,
                      width: job.dimensions?.width || 0,
                      height: job.dimensions?.height || 0,
                      volume: parseFloat(e.target.value) || 0
                    }
                  })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Print Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Print Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="printTime">Print Time (hours)</Label>
            <Input
              id="printTime"
              type="number"
              step="0.1"
              value={job.printTime}
              onChange={(e) => updateJob({ printTime: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="filamentWeight">Filament Weight (grams)</Label>
            <Input
              id="filamentWeight"
              type="number"
              value={job.filamentWeight}
              onChange={(e) => updateJob({ filamentWeight: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="filamentType">Filament Type</Label>
            <Select value={job.filamentType} onValueChange={handleFilamentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select filament" />
              </SelectTrigger>
              <SelectContent>
                {filamentTypes.map((filament) => (
                  <SelectItem key={filament.name} value={filament.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{filament.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        ${filament.costPerKg}/kg
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filamentCost">Cost per kg ($)</Label>
            <Input
              id="filamentCost"
              type="number"
              step="0.01"
              value={job.filamentCostPerKg}
              onChange={(e) => updateJob({ filamentCostPerKg: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Equipment & Power */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Equipment & Power
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="printerName">Printer</Label>
            <Select value={job.printerName} onValueChange={handlePrinterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select printer" />
              </SelectTrigger>
              <SelectContent>
                {printers.map((printer) => (
                  <SelectItem key={printer.name} value={printer.name}>
                    <div className="flex flex-col">
                      <span>{printer.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {printer.powerConsumption}W • {printer.maxVolume}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="powerConsumption">Power Consumption (W)</Label>
            <Input
              id="powerConsumption"
              type="number"
              value={job.powerConsumption}
              onChange={(e) => updateJob({ powerConsumption: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="electricityCost">Electricity Cost ($/kWh)</Label>
            <Input
              id="electricityCost"
              type="number"
              step="0.01"
              value={job.electricityCostPerHour}
              onChange={(e) => updateJob({ electricityCostPerHour: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="laborRate">Labor Rate ($/hour)</Label>
            <Input
              id="laborRate"
              type="number"
              step="0.01"
              value={job.laborRate}
              onChange={(e) => updateJob({ laborRate: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Additional Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maintenanceBuffer">Maintenance Buffer (%)</Label>
            <Input
              id="maintenanceBuffer"
              type="number"
              step="0.1"
              value={job.maintenanceBuffer}
              onChange={(e) => updateJob({ maintenanceBuffer: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="packagingCost">Packaging Cost ($)</Label>
            <Input
              id="packagingCost"
              type="number"
              step="0.01"
              value={job.packagingCost}
              onChange={(e) => updateJob({ packagingCost: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="shippingCost">Shipping Cost ($)</Label>
            <Input
              id="shippingCost"
              type="number"
              step="0.01"
              value={job.shippingCost}
              onChange={(e) => updateJob({ shippingCost: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="markup">Markup (%)</Label>
            <Input
              id="markup"
              type="number"
              step="0.1"
              value={job.markup}
              onChange={(e) => updateJob({ markup: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}