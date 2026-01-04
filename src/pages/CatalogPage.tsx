import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { ProductCard } from '@/components/ui/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export function CatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);
  return (
    <div className="min-h-screen bg-brand-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold text-brand-slate mb-4">Rental Catalog</h1>
          <p className="text-muted-foreground">Select from our premium selection of event essentials.</p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-slate mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${!selectedCategory ? 'bg-brand-slate text-white' : 'hover:bg-brand-slate/5 text-muted-foreground'}`}
                >
                  All Items
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === cat ? 'bg-brand-slate text-white' : 'hover:bg-brand-slate/5 text-muted-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 h-12 border-none shadow-soft"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden h-12 gap-2 border-none shadow-soft bg-white">
                    <Filter className="w-4 h-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-2">
                    <Button
                      variant={!selectedCategory ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Items
                    </Button>
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {selectedCategory && (
              <div className="mb-6 flex items-center gap-2">
                <Badge className="bg-brand-amber hover:bg-brand-amber gap-2 py-1 px-3">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                </Badge>
              </div>
            )}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                <Button variant="link" onClick={() => { setSearch(''); setSelectedCategory(null); }} className="text-brand-amber">
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}