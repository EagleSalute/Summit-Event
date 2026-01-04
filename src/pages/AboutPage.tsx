import React from 'react';
import { Sparkles, Heart, Award, Users } from 'lucide-react';
export function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-5xl font-display font-bold text-brand-slate leading-tight">
              Crafting <span className="italic text-brand-amber">Atmospheres</span> Since 2012
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Summit Event Rentals, we believe that the backdrop of your most important moments should be as extraordinary as the moments themselves.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in the heart of Los Angeles by a team of designers and event planners, we set out to bridge the gap between "standard rental gear" and "curated luxury furniture."
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <p className="text-3xl font-display font-bold text-brand-slate">1,200+</p>
                <p className="text-sm text-brand-amber font-semibold uppercase tracking-widest">Events Curated</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-display font-bold text-brand-slate">150+</p>
                <p className="text-sm text-brand-amber font-semibold uppercase tracking-widest">Unique Items</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                alt="Summit Event Rentals Story"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-amber/10 rounded-2xl -z-0" />
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-slate/10 rounded-2xl -z-0" />
          </div>
        </div>
        <div className="bg-white rounded-3xl p-12 shadow-soft grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-amber">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Passion for Design</h3>
            <p className="text-muted-foreground text-sm">Every piece in our catalog is hand-selected for its aesthetic value and structural integrity.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-amber">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Summit Service</h3>
            <p className="text-muted-foreground text-sm">Our concierge team works alongside you to ensure your vision comes to life perfectly.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-amber">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">White-Glove Delivery</h3>
            <p className="text-muted-foreground text-sm">We handle the heavy lifting with precision, ensuring everything is set up to your specifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}