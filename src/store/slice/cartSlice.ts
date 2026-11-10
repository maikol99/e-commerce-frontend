import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  finalPrice: number;
  image?: string;
  author?: string;
  condition?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i._id !== id);
      } else {
        const item = state.items.find((i) => i._id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
