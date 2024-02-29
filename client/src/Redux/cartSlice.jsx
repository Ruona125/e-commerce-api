// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalCarts: 0, // Initialize totalCarts to 0
  },
  reducers: {
    setTotalCarts: (state, action) => {
      state.totalCarts = action.payload;
    },
    increment: (state) => {
      state.totalCarts += 1; // Increment the cart count
    },
    decrement: (state) => {
      state.totalCarts -= 1; // Decrement the cart count if needed
    },
  },
});

export const { setTotalCarts, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
