import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b py-3 shadow-sm' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className={cn(
              "text-2xl font-display font-bold tracking-tight",
              !isScrolled && location.pathname === '/' ? "text-white" : "text-brand-slate"
            )}>
              AURA
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-amber",
                  !isScrolled && location.pathname === '/' ? "text-white/90" : "text-brand-slate/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className={cn(
                  "h-5 w-5",
                  !isScrolled && location.pathname === '/' ? "text-white" : "text-brand-slate"
                )} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-amber">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className={cn(
                    "h-5 w-5",
                    !isScrolled && location.pathname === '/' ? "text-white" : "text-brand-slate"
                  )} />
                </Button>
              </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={cn(!isScrolled && location.pathname === '/' ? "text-white" : "text-brand-slate")} />
              ) : (
                <Menu className={cn(!isScrolled && location.pathname === '/' ? "text-white" : "text-brand-slate")} />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-brand-slate"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}