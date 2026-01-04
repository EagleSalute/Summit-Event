import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { PRODUCTS } from '@/lib/data';
import { motion } from 'framer-motion';
export function HomePage() {
  const featured = PRODUCTS.slice(0, 3);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Summit Event Setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-slate/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6">
            SUMMIT EVENT RENTALS EST. 2012
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight">
            Elevate Every <br /> <span className="text-brand-amber italic">Occasion</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
            Premium event rentals designed for the most discerning hosts. Summit brings sophistication to weddings, galas, and private celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-brand-amber hover:bg-brand-amber/90 text-white px-8 h-14 text-lg">
                View Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-slate px-8 h-14 text-lg">
                Contact Concierge
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Rentals */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-bold text-brand-slate">The Summit Signature Collection</h2>
              <p className="text-muted-foreground max-w-lg">
                Discover our curated selection of high-end event pieces, from artisan tables to handcrafted seating.
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="ghost" className="text-brand-amber hover:text-brand-amber font-semibold gap-2">
                Browse Full Catalog <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="py-24 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Star, title: "Premium Quality", desc: "Meticulously maintained inventory" },
              { icon: Shield, title: "Summit Trusted", desc: "Preferred by top event planners" },
              { icon: Clock, title: "Always On Time", desc: "Precision white-glove delivery" },
              { icon: Sparkles, title: "Unique Selection", desc: "Exclusive pieces you won't find elsewhere" }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-brand-amber/10 text-brand-amber rounded-xl flex items-center justify-center mx-auto">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-brand-slate">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-24 bg-brand-slate text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles className="w-64 h-64" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display italic mb-12">"Summit Event Rentals transformed our backyard into a luxury venue. Their attention to detail and quality of rentals is unmatched in the industry."</h2>
          <div className="space-y-1">
            <p className="font-bold text-lg">Sarah & Michael Jensen</p>
            <p className="text-brand-amber text-sm tracking-widest uppercase">September 2023 Wedding</p>
          </div>
        </div>
      </section>
    </div>
  );
}