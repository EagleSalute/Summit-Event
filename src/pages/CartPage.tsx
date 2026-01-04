import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/store/use-cart';
import { Trash2, Calendar, MapPin, Send, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
const inquirySchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
  eventDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Event must be in the future",
  }),
  address: z.string().min(5, "Address required"),
});
type InquiryForm = z.infer<typeof inquirySchema>;
export function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const [isSuccess, setIsSuccess] = useState(false);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema)
  });
  const onSubmit = async (data: InquiryForm) => {
    try {
      await api('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          customerName: data.name,
          email: data.email,
          phone: data.phone,
          eventDate: data.eventDate,
          address: data.address,
          items,
          totalAmount: total
        })
      });
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 bg-white p-12 rounded-3xl shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-display font-bold text-brand-slate">Inquiry Received</h1>
            <p className="text-muted-foreground leading-relaxed">
              Your request for quote has been sent. We will contact you within 24 hours.
            </p>
          </div>
          <Link to="/">
            <Button className="w-full bg-brand-slate hover:bg-brand-amber h-12 text-lg gap-2 mt-4">
              Return Home <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-brand-amber/10 text-brand-amber rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-slate">Your Quote is Empty</h1>
          <p className="text-muted-foreground">Add items to request a personalized quote.</p>
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
        <div className="mb-12 text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-slate">Review Quote</h1>
          <p className="text-muted-foreground italic">Check availability for your special event</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="p-6 flex gap-6 border-b last:border-0"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/catalog/${item.id}`} className="hover:text-brand-amber transition-colors">
                            <h3 className="font-bold text-brand-slate text-lg">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-brand-amber font-semibold">${item.price.toFixed(2)} / unit</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded-lg px-2 py-1 bg-brand-cream/50">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 font-bold">-</button>
                          <span className="px-4 text-sm font-bold w-12 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 font-bold">+</button>
                        </div>
                        <p className="text-sm font-bold text-brand-slate ml-auto">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bg-brand-slate text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
              <span className="text-lg font-medium opacity-80">Estimated Total</span>
              <span className="text-3xl font-display font-bold text-brand-amber">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Card className="border-none shadow-soft sticky top-32 overflow-hidden rounded-2xl">
              <CardHeader className="bg-brand-slate text-white p-6">
                <CardTitle className="text-xl font-display font-bold">Event Logistics</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register('name')} placeholder="Client Name" className="bg-brand-cream border-none h-11" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" {...register('email')} type="email" placeholder="email@address.com" className="bg-brand-cream border-none h-11" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" {...register('phone')} type="tel" placeholder="(555) 000-0000" className="bg-brand-cream border-none h-11" />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Event Date</Label>
                    <Input id="eventDate" {...register('eventDate')} type="date" className="bg-brand-cream border-none h-11" />
                    {errors.eventDate && <p className="text-xs text-red-500">{errors.eventDate.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Venue / Address</Label>
                    <Input id="address" {...register('address')} placeholder="City or Specific Venue" className="bg-brand-cream border-none h-11" />
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-amber hover:bg-brand-slate transition-all h-14 text-lg font-bold gap-2 shadow-xl"
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"} <Send className="w-4 h-4" />
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