import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import profileReducer from './slices/ProfileSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import { loadState, saveState } from '@/utils/localStorage';
import throttle from 'lodash.throttle';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    orders: orderReducer,
    users: userReducer,
  },
  preloadedState,
});

store.subscribe(
  // We use throttle to ensure we don't write to localStorage too often
  throttle(() => {
    saveState({
      auth: store.getState().auth,
      cart: store.getState().cart,
      wishlist: store.getState().wishlist,
      // Also persist the user's addresses
      profile: store.getState().profile,
      orders: store.getState().orders,
      users: store.getState().users,
    });
  }, 1000) // Save at most once per second
);

export default store;