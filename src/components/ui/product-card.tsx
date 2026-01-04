import React from 'react';
import { Plus } from 'lucide-react';
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
  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to inquiry`);
  };
  return (
    <Card className="group overflow-hidden border-none shadow-soft hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <CardContent className="pt-6">
        <div className="text-xs font-semibold text-brand-amber uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <h3 className="text-lg font-display font-bold text-brand-slate mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="text-lg font-semibold text-brand-slate">
          ${product.price.toFixed(2)} <span className="text-xs text-muted-foreground font-normal">/ item</span>
        </div>
      </CardContent>
      <CardFooter className="pb-6">
        <Button
          onClick={handleAdd}
          className="w-full bg-brand-slate hover:bg-brand-amber transition-colors gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Quote
        </Button>
      </CardFooter>
    </Card>
  );
}