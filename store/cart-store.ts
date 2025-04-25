import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the type for cart items
export type CartItem = {
  productId: string
  quantity: number
}

// Define the store type
type CartStore = {
  items: CartItem[]
  addItem: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

// Create the store with persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      
      // Add an item to the cart
      addItem: (productId: string, quantity: number) => 
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId)
          
          if (existingItem) {
            // If item already exists, update its quantity
            return {
              items: state.items.map(item => 
                item.productId === productId 
                  ? { ...item, quantity: item.quantity + quantity } 
                  : item
              )
            }
          } else {
            // Otherwise add new item
            return {
              items: [...state.items, { productId, quantity }]
            }
          }
        }),
      
      // Remove an item from the cart
      removeItem: (productId: string) => 
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        })),
      
      // Update the quantity of an item
      updateQuantity: (productId: string, quantity: number) => 
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(item => item.productId !== productId)
            }
          }
          
          return {
            items: state.items.map(item => 
              item.productId === productId 
                ? { ...item, quantity } 
                : item
            )
          }
        }),
      
      // Clear the entire cart
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    }
  )
)