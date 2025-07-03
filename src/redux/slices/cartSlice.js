import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  discountAmount: 0,
  totalAmount: 0,
  totalQuantity: 0,
  appliedCoupon: null,
};

// Helper function to recalculate totals
const recalculateCart = (state) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.subtotal = state.items.reduce((total, item) => total + item.totalPrice, 0);

  if (state.appliedCoupon) {
    if (state.appliedCoupon.type === 'percentage') {
      state.discountAmount = (state.subtotal * state.appliedCoupon.discount) / 100;
    } else if (state.appliedCoupon.type === 'fixed') {
      state.discountAmount = state.appliedCoupon.discount;
    } else {
      state.discountAmount = 0;
    }
    state.discountAmount = Math.min(state.discountAmount, state.subtotal);
  } else {
    state.discountAmount = 0;
  }

  state.totalAmount = state.subtotal - state.discountAmount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({ ...item, quantity: 1, totalPrice: item.price });
      }
      recalculateCart(state);
    },
    addItemsToCart: (state, action) => {
      const itemsToAdd = action.payload; // Expects: [{ product, quantity, size }]
      itemsToAdd.forEach(item => {
        const { product, quantity, size } = item;
        const existingItem = state.items.find(i => i.id === product.id && i.size === size);
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
          state.items.push({
            ...product,
            size,
            quantity,
            price: product.price,
            totalPrice: product.price * quantity,
          });
        }
      });
      recalculateCart(state);
    },
    removeItemFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.size === size));
      recalculateCart(state);
    },
    incrementItemQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(i => i.id === id && i.size === size);
      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
      recalculateCart(state);
    },
    decrementItemQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(i => i.id === id && i.size === size);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
      }
      recalculateCart(state);
    },
    updateItemSize: (state, action) => {
      const { id, oldSize, newSize } = action.payload;
      const itemToUpdate = state.items.find(i => i.id === id && i.size === oldSize);
      if (!itemToUpdate) return;

      const existingItemWithNewSize = state.items.find(i => i.id === id && i.size === newSize);
      if (existingItemWithNewSize) {
        existingItemWithNewSize.quantity += itemToUpdate.quantity;
        existingItemWithNewSize.totalPrice = existingItemWithNewSize.price * existingItemWithNewSize.quantity;
        state.items = state.items.filter(i => !(i.id === id && i.size === oldSize));
      } else {
        itemToUpdate.size = newSize;
      }
      recalculateCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      recalculateCart(state);
    },
    applyCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
      recalculateCart(state);
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      recalculateCart(state);
    },
  },
});

export const {
  addItemToCart,
  addItemsToCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  updateItemSize,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;