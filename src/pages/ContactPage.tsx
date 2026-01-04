import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;
export function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });
  const onSubmit = async (data: ContactForm) => {
    try {
      await api('/api/contact-messages', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      toast.success('Message Sent!', {
        description: "A concierge member will reach out to you shortly."
      });
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message.');
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-slate">Get in <span className="italic text-brand-amber">Touch</span></h1>
          <p className="text-lg text-muted-foreground">Our concierge team is here to help you select the perfect pieces.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register('name')} placeholder="Elias Thorne" className="h-12 border-none shadow-soft bg-brand-cream" />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="elias@example.com" className="h-12 border-none shadow-soft bg-brand-cream" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...register('subject')} placeholder="Wedding inquiry" className="h-12 border-none shadow-soft bg-brand-cream" />
                {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" {...register('message')} placeholder="Tell us about your event vision..." className="min-h-[200px] border-none shadow-soft bg-brand-cream" />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-brand-slate hover:bg-brand-amber text-lg gap-2 shadow-lg">
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <Card className="border-none shadow-soft overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <h3 className="text-2xl font-display font-bold text-brand-slate">Concierge Desk</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Call Us</p>
                      <p className="text-lg font-semibold text-brand-slate">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                      <p className="text-lg font-semibold text-brand-slate">concierge@auraevents.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t space-y-4">
                  <div className="flex items-center gap-2 text-brand-slate font-bold">
                    <Clock className="w-5 h-5 text-brand-amber" />
                    Office Hours
                  </div>
                  <div className="grid grid-cols-2 text-sm gap-y-2">
                    <span className="text-muted-foreground">Mon - Fri</span>
                    <span className="text-right font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}