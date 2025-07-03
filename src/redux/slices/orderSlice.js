import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action) => {
      const { orderId, updates } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        // Merge existing order with updates
        state.orders[orderIndex] = { ...state.orders[orderIndex], ...updates };
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const orderToCancel = state.orders.find(order => order.id === orderId);
      if (orderToCancel) {
        orderToCancel.status = 'Cancelled';
      }
    },
  },
});

export const { addOrder, cancelOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;