import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-amber selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}