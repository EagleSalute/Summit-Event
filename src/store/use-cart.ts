import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        ),
      })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'aura-cart-storage' }
  )
);