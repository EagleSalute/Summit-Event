export interface Product {
  id: string;
  name: string;
  category: 'Tents' | 'Seating' | 'Tables' | 'Lighting' | 'Linens';
  price: number;
  image: string;
  description: string;
  dimensions?: string;
  capacity?: string;
}
export const CATEGORIES = ['Tents', 'Seating', 'Tables', 'Lighting', 'Linens'] as const;
export const PRODUCTS: Product[] = [
  {
    id: 't1',
    name: 'Majestic High-Peak Tent',
    category: 'Tents',
    price: 450,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant 40x60 high-peak tent perfect for luxury weddings and outdoor galas.',
    dimensions: '40ft x 60ft',
  },
  {
    id: 's1',
    name: 'Gold Chiavari Chair',
    category: 'Seating',
    price: 12,
    image: 'https://images.unsplash.com/photo-1549497538-301288c8549a?auto=format&fit=crop&q=80&w=800',
    description: 'Classic resin Chiavari chair with a premium gold finish and white cushion.',
  },
  {
    id: 's2',
    name: 'Rustic Vineyard Cross-Back',
    category: 'Seating',
    price: 15,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
    description: 'Natural oak wood cross-back chair for a timeless farmhouse aesthetic.',
  },
  {
    id: 'tb1',
    name: 'Handcrafted Farmhouse Table',
    category: 'Tables',
    price: 85,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    description: 'Solid pine wood table with a rich walnut stain. Seats 8-10 comfortably.',
    dimensions: '8ft x 40in',
  },
  {
    id: 'l1',
    name: 'Edison Bulb String Lights',
    category: 'Lighting',
    price: 55,
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=800',
    description: 'Warm, amber glow string lights for a romantic outdoor atmosphere.',
    dimensions: '50ft strand',
  },
  {
    id: 'ln1',
    name: 'Dusty Rose Velvet Linen',
    category: 'Linens',
    price: 32,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
    description: 'Heavyweight premium velvet tablecloth with a subtle metallic sheen.',
    dimensions: '120in Round',
  }
];