import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, CheckCircle, Package, Maximize2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductById, getRelatedProducts } from '@/lib/data';
import { useCartStore } from '@/store/use-cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ui/product-card';
import { toast } from 'sonner';
export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;
  const addItem = useCartStore((s) => s.addItem);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-display font-bold">Item Not Found</h2>
          <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
        </div>
      </div>
    );
  }
  const related = getRelatedProducts(product);
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to quote`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 lg:py-20">
        <Link 
          to="/catalog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-brand-amber transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-slate/5 group-hover:bg-transparent transition-colors" />
          </motion.div>
          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <span className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-slate mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-brand-slate">
                ${product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ per event day</span>
              </p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
              {product.dimensions && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0">
                    <Maximize2 className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dimensions</p>
                    <p className="font-semibold text-brand-slate">{product.dimensions}</p>
                  </div>
                </div>
              )}
              {product.capacity && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Capacity</p>
                    <p className="font-semibold text-brand-slate">{product.capacity}</p>
                  </div>
                </div>
              )}
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-amber" /> Specifications
              </h3>
              <div className="space-y-3">
                {product.specs ? Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-brand-slate/5">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-brand-slate">{val}</span>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground italic">Standard premium equipment specs apply.</p>
                )}
              </div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 h-14 bg-brand-slate hover:bg-brand-amber text-lg gap-2"
              >
                <Plus className="w-5 h-5" /> Add to Quote
              </Button>
              <Link to="/contact" className="sm:w-1/3">
                <Button variant="outline" size="lg" className="w-full h-14 border-brand-slate text-brand-slate hover:bg-brand-slate hover:text-white">
                  Questions?
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-green-500" /> Professional White-Glove Setup Available
            </div>
          </motion.div>
        </div>
        {/* Related Items */}
        {related.length > 0 && (
          <section className="pt-20 border-t">
            <h2 className="text-3xl font-display font-bold text-brand-slate mb-12">Related Pieces</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard product={item} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}