export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export type InquiryStatus = 'pending' | 'confirmed' | 'archived';
export interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: InquiryStatus;
  createdAt: number;
}
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
  status: 'unread' | 'read' | 'archived';
}