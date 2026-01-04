export interface Product {
  id: string;
  name: string;
  category: 'Tents' | 'Seating' | 'Tables' | 'Lighting' | 'Linens';
  price: number;
  image: string;
  description: string;
  dimensions?: string;
  capacity?: string;
  specs?: Record<string, string>;
}
export const CATEGORIES = ['Tents', 'Seating', 'Tables', 'Lighting', 'Linens'] as const;
export const PRODUCTS: Product[] = [
  {
    id: 't1',
    name: 'Majestic High-Peak Tent',
    category: 'Tents',
    price: 450,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant 40x60 high-peak tent perfect for luxury weddings and outdoor galas. Provides a clean, modern silhouette that elevates any landscape.',
    dimensions: '40ft x 60ft',
    capacity: '120-150 Guests',
    specs: {
      'Material': 'Professional Grade PVC',
      'Wind Rating': 'Up to 50mph',
      'Installation': 'Grass or Pavement'
    }
  },
  {
    id: 't2',
    name: 'Coastal Sailcloth Tent',
    category: 'Tents',
    price: 550,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    description: 'Translucent sailcloth material that glows beautifully at night. Wood poles provide a nautical, organic feel.',
    dimensions: '32ft x 63ft',
    capacity: '100 Guests',
    specs: {
      'Material': 'Genuine Sailcloth',
      'Poles': 'Hand-finished Spruce',
      'Waterproof': '100% Weatherproof'
    }
  },
  {
    id: 's1',
    name: 'Gold Chiavari Chair',
    category: 'Seating',
    price: 12,
    image: 'https://images.unsplash.com/photo-1549497538-301288c8549a?auto=format&fit=crop&q=80&w=800',
    description: 'Classic resin Chiavari chair with a premium gold finish and white cushion. The gold standard for formal receptions.',
    capacity: 'Single Seat',
    specs: {
      'Finish': 'Metallic Gold',
      'Cushion': 'High-density foam included',
      'Weight Capacity': '300 lbs'
    }
  },
  {
    id: 's2',
    name: 'Rustic Vineyard Cross-Back',
    category: 'Seating',
    price: 15,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
    description: 'Natural oak wood cross-back chair for a timeless farmhouse aesthetic. Perfect for winery or garden weddings.',
    specs: {
      'Material': 'Solid Oak Wood',
      'Style': 'Tuscan / Farmhouse',
      'Stackable': 'No'
    }
  },
  {
    id: 's3',
    name: 'Velvet Louis XVI Chair',
    category: 'Seating',
    price: 28,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800',
    description: 'Ornate French-style chair with plush cream velvet upholstery and weathered wood frame.',
    specs: {
      'Style': 'Neo-Classical',
      'Upholstery': 'Premium Italian Velvet',
      'Frame': 'Hand-carved Beechwood'
    }
  },
  {
    id: 'tb1',
    name: 'Handcrafted Farmhouse Table',
    category: 'Tables',
    price: 85,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    description: 'Solid pine wood table with a rich walnut stain. Seats 8-10 comfortably.',
    dimensions: '8ft x 40in',
    specs: {
      'Wood': 'American Pine',
      'Stain': 'Deep Walnut',
      'Seating': '8-10 people'
    }
  },
  {
    id: 'l1',
    name: 'Edison Bulb String Lights',
    category: 'Lighting',
    price: 55,
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=800',
    description: 'Warm, amber glow string lights for a romantic outdoor atmosphere.',
    dimensions: '50ft strand',
    specs: {
      'Bulbs': 'Incandescent Edison S14',
      'Voltage': '110V',
      'Weather': 'Commercial Grade IP65'
    }
  },
  {
    id: 'ln1',
    name: 'Dusty Rose Velvet Linen',
    category: 'Linens',
    price: 32,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
    description: 'Heavyweight premium velvet tablecloth with a subtle metallic sheen.',
    dimensions: '120in Round',
    specs: {
      'Material': 'Heavyweight Velvet',
      'Drop': 'Floor length on 60" round',
      'Care': 'Professional laundering included'
    }
  }
];
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
export function getRelatedProducts(product: Product, limit: number = 3): Product[] {
  return PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}