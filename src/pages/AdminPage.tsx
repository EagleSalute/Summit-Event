import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Inquiry, ContactMessage, InquiryStatus } from '@shared/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CheckCircle, Archive, MessageSquare, ShoppingBag, Loader2, Lock, LogOut } from 'lucide-react';
import { toast } from 'sonner';
export function AdminPage() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('summit_admin_session') === 'active';
  });
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'summit2024') {
      setIsAuthenticated(true);
      localStorage.setItem('summit_admin_session', 'active');
      toast.success('Welcome back, Administrator');
    } else {
      toast.error('Invalid access key');
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('summit_admin_session');
    toast.info('Logged out successfully');
  };
  const { data: inquiries, isLoading: loadingInquiries } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => api<{ items: Inquiry[] }>('/api/inquiries').then(res => res.items),
    enabled: isAuthenticated
  });
  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => api<{ items: ContactMessage[] }>('/api/contact-messages').then(res => res.items),
    enabled: isAuthenticated
  });
  const updateInquiryStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: InquiryStatus }) =>
      api(`/api/inquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast.success('Inquiry updated');
    }
  });
  const updateMessageStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'read' | 'archived' }) =>
      api(`/api/contact-messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Message updated');
    }
  });
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-none shadow-2xl overflow-hidden rounded-3xl">
          <div className="bg-brand-slate p-8 text-center text-white">
            <div className="w-16 h-16 bg-brand-amber/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-amber/30">
              <Lock className="w-8 h-8 text-brand-amber" />
            </div>
            <CardTitle className="text-3xl font-display font-bold">Summit Portal</CardTitle>
            <CardDescription className="text-slate-400 mt-2">Restricted Access for Concierge Staff</CardDescription>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Access Key</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-brand-cream border-none h-12 text-lg tracking-widest"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full bg-brand-slate hover:bg-brand-amber h-12 text-lg font-bold">
                Unlock Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  const pendingCount = inquiries?.filter(i => i.status === 'pending').length ?? 0;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-16">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-display font-bold text-brand-slate">Concierge Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage rental inquiries and Summit client communications.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-brand-slate text-brand-slate hover:bg-brand-slate hover:text-white gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-none shadow-soft bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
              <ShoppingBag className="w-4 h-4 text-brand-amber" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Messages</CardTitle>
              <MessageSquare className="w-4 h-4 text-brand-amber" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{messages?.filter(m => m.status === 'unread').length ?? 0}</div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="bg-brand-cream border-none p-1">
            <TabsTrigger value="inquiries" className="rounded-md">Quote Requests</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-md">Contact Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="inquiries">
            <Card className="border-none shadow-soft overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingInquiries ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-amber" /></TableCell></TableRow>
                  ) : inquiries?.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-10">No inquiries found.</TableCell></TableRow>
                  ) : inquiries?.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell className="font-medium">{format(inq.createdAt, 'MMM d, p')}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{inq.customerName}</span>
                          <span className="text-xs text-muted-foreground">{inq.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{inq.items.length} items</TableCell>
                      <TableCell>${inq.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={inq.status === 'pending' ? 'outline' : 'default'} className={inq.status === 'confirmed' ? 'bg-green-500' : ''}>
                          {inq.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => updateInquiryStatus.mutate({ id: inq.id, status: 'confirmed' })}><CheckCircle className="w-4 h-4 text-green-500" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => updateInquiryStatus.mutate({ id: inq.id, status: 'archived' })}><Archive className="w-4 h-4 text-muted-foreground" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="messages">
            <Card className="border-none shadow-soft overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingMessages ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-amber" /></TableCell></TableRow>
                  ) : messages?.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-10">No messages found.</TableCell></TableRow>
                  ) : messages?.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="text-sm">{format(msg.createdAt, 'MMM d, p')}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{msg.name}</span>
                          <span className="text-xs text-muted-foreground">{msg.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{msg.subject}</TableCell>
                      <TableCell>
                        <Badge variant={msg.status === 'unread' ? 'destructive' : 'secondary'}>{msg.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => updateMessageStatus.mutate({ id: msg.id, status: 'read' })}><CheckCircle className="w-4 h-4 text-blue-500" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => updateMessageStatus.mutate({ id: msg.id, status: 'archived' })}><Archive className="w-4 h-4 text-muted-foreground" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}