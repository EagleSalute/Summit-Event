import React from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data';
import { useCartStore } from '@/store/use-cart';
import { toast } from 'sonner';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to Summit quote`);
  };
  return (
    <Link to={`/catalog/${product.id}`} className="block group">
      <Card className="overflow-hidden border-none shadow-soft hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl h-full flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-brand-slate/5 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-brand-slate">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
             <span className="px-3 py-1 bg-brand-slate/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
               {product.category}
             </span>
          </div>
        </div>
        <CardContent className="pt-6 flex-1">
          <h3 className="text-xl font-display font-bold text-brand-slate mb-2 group-hover:text-brand-amber transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-light">
            {product.description}
          </p>
          <div className="text-lg font-semibold text-brand-slate">
            ${product.price.toFixed(2)} <span className="text-xs text-muted-foreground font-normal">/ day</span>
          </div>
        </CardContent>
        <CardFooter className="pb-6">
          <Button
            onClick={handleAdd}
            className="w-full bg-brand-cream text-brand-slate hover:bg-brand-amber hover:text-white transition-all duration-300 gap-2 rounded-xl h-11 border-none shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add to Quote
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}