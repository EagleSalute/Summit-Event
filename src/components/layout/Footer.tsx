import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-brand-slate text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">AURA</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Curating unforgettable moments with premium event equipment. From luxury weddings to corporate galas.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-slate-400 hover:text-brand-amber cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-slate-400 hover:text-brand-amber cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-brand-amber cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Collections</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/catalog?cat=Tents" className="hover:text-white transition-colors">Luxury Tents</Link></li>
              <li><Link to="/catalog?cat=Seating" className="hover:text-white transition-colors">Premium Seating</Link></li>
              <li><Link to="/catalog?cat=Tables" className="hover:text-white transition-colors">Tables & Bars</Link></li>
              <li><Link to="/catalog?cat=Lighting" className="hover:text-white transition-colors">Ambient Lighting</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>123 Event Row, Los Angeles, CA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>hello@auraevents.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Aura Event Rentals. All rights reserved.
          </p>
          <div className="text-xs text-slate-500 flex gap-6">
            <span>Designed with Elegance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}