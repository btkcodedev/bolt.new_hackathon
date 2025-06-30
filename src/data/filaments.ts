import { FilamentType } from '@/types';

export const filamentTypes: FilamentType[] = [
  {
    name: 'PLA',
    costPerKg: 25,
    density: 1.24,
    printTemp: 210,
    bedTemp: 60,
    properties: ['Easy to print', 'Biodegradable', 'Low odor', 'Good surface finish']
  },
  {
    name: 'ABS',
    costPerKg: 28,
    density: 1.04,
    printTemp: 250,
    bedTemp: 100,
    properties: ['Strong', 'Heat resistant', 'Chemical resistant', 'Flexible']
  },
  {
    name: 'PETG',
    costPerKg: 32,
    density: 1.27,
    printTemp: 235,
    bedTemp: 85,
    properties: ['Clear', 'Chemical resistant', 'Strong', 'Food safe']
  },
  {
    name: 'TPU',
    costPerKg: 45,
    density: 1.20,
    printTemp: 220,
    bedTemp: 50,
    properties: ['Flexible', 'Rubber-like', 'Tear resistant', 'Shore A 95']
  },
  {
    name: 'Wood Fill',
    costPerKg: 38,
    density: 1.28,
    printTemp: 200,
    bedTemp: 60,
    properties: ['Wood-like finish', 'Sandable', 'Stainable', 'Natural feel']
  },
  {
    name: 'Carbon Fiber',
    costPerKg: 85,
    density: 1.40,
    printTemp: 270,
    bedTemp: 110,
    properties: ['Ultra strong', 'Lightweight', 'Conductive', 'Professional grade']
  }
];

export const printers = [
  { name: 'Ender 3 V2', powerConsumption: 270, maxVolume: '220×220×250mm' },
  { name: 'Prusa i3 MK3S+', powerConsumption: 120, maxVolume: '250×210×210mm' },
  { name: 'Bambu Lab X1 Carbon', powerConsumption: 350, maxVolume: '256×256×256mm' },
  { name: 'Ultimaker S3', powerConsumption: 221, maxVolume: '230×190×200mm' },
  { name: 'Formlabs Form 3', powerConsumption: 65, maxVolume: '145×145×185mm' },
  { name: 'Custom Printer', powerConsumption: 200, maxVolume: 'Variable' }
];