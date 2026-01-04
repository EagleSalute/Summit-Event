import React from 'react';
import { useCartStore } from '@/store/use-cart';
import { Trash2, Calendar, MapPin, Send, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
export function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Inquiry submitted!', {
      description: 'Our concierge team will review your selection and contact you within 24 hours.',
    });
    clearCart();
  };
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="w-20 h-20 bg-brand-amber/10 text-brand-amber rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-slate">Your Quote is Empty</h1>
          <p className="text-muted-foreground">Add some elegant pieces to your collection to request a personalized quote.</p>
          <Link to="/catalog">
            <Button className="bg-brand-slate hover:bg-brand-amber mt-4">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-brand-slate mb-10 text-center">Inquiry List</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-none shadow-soft overflow-hidden">
                <CardContent className="p-4 flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-brand-slate text-lg">{item.name}</h3>
                        <p className="text-sm text-brand-amber font-semibold">${item.price.toFixed(2)} / item</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-md px-2 py-1 bg-brand-cream">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 hover:text-brand-amber">-</button>
                        <span className="px-4 text-sm font-medium w-12 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 hover:text-brand-amber">+</button>
                      </div>
                      <p className="text-sm font-bold text-brand-slate ml-auto">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="pt-6 flex justify-between items-center text-xl font-bold text-brand-slate">
              <span>Estimated Rental Total</span>
              <span className="text-brand-amber">${total.toFixed(2)}</span>
            </div>
          </div>
          {/* Inquiry Form */}
          <div className="lg:col-span-5">
            <Card className="border-none shadow-soft">
              <CardHeader className="bg-brand-slate text-white rounded-t-lg">
                <CardTitle className="text-xl font-display">Event Details</CardTitle>
                <p className="text-slate-400 text-xs mt-1">Complete this form to check availability and delivery costs.</p>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required placeholder="John Doe" className="bg-brand-cream border-none h-11" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="bg-brand-cream border-none h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required placeholder="(555) 000-0000" className="bg-brand-cream border-none h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-amber" /> Event Date</Label>
                    <Input type="date" required className="bg-brand-cream border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-amber" /> Delivery Address</Label>
                    <Input required placeholder="Venue Address or City" className="bg-brand-cream border-none h-11" />
                  </div>
                  <Separator className="my-6" />
                  <Button type="submit" className="w-full bg-brand-amber hover:bg-brand-slate transition-all h-12 text-lg font-bold gap-2 group">
                    Send Inquiry <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}