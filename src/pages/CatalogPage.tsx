import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { ProductCard } from '@/components/ui/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const selectedCategory = searchParams.get('cat');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, search]);
  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(term);
      const matchesCat = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);
  const handleSetCategory = useCallback((cat: string | null) => {
    if (cat) {
      setSearchParams({ cat });
    } else {
      setSearchParams({});
    }
  }, [setSearchParams]);
  return (
    <div className="min-h-screen bg-brand-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-brand-slate">Inventory</h1>
            <p className="text-muted-foreground italic">Curating luxury since 2012</p>
          </div>
          <div className="text-sm font-semibold text-brand-slate/60 uppercase tracking-widest">
            {filteredProducts.length} Results Found
          </div>
        </header>
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="hidden md:block w-64 space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate mb-6 flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" /> Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleSetCategory(null)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${!selectedCategory ? 'bg-brand-slate text-white shadow-lg' : 'hover:bg-brand-slate/5 text-muted-foreground'}`}
                >
                  All Collections
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSetCategory(cat)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${selectedCategory === cat ? 'bg-brand-slate text-white shadow-lg' : 'hover:bg-brand-slate/5 text-muted-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search our catalog..."
                  className="pl-12 h-14 border-none shadow-soft rounded-2xl bg-white focus-visible:ring-brand-amber"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden h-14 gap-2 border-none shadow-soft bg-white rounded-2xl px-6">
                    <Filter className="w-4 h-4" /> Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="font-display italic text-2xl">Collections</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-2">
                    <Button
                      variant={!selectedCategory ? 'default' : 'ghost'}
                      className="w-full justify-start h-12 rounded-xl"
                      onClick={() => handleSetCategory(null)}
                    >
                      All Items
                    </Button>
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'ghost'}
                        className="w-full justify-start h-12 rounded-xl"
                        onClick={() => handleSetCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {selectedCategory && (
              <div className="mb-8 flex items-center gap-2">
                <Badge className="bg-brand-amber hover:bg-brand-amber/90 gap-2 py-1.5 px-4 rounded-full text-sm border-none text-white">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleSetCategory(null)} />
                </Badge>
              </div>
            )}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl shadow-soft">
                <p className="text-muted-foreground text-lg mb-6 italic">No pieces found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => { setSearch(''); handleSetCategory(null); }}
                  className="border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-white rounded-xl"
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}