import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsData from '@/data/product';
import { v4 as uuidv4 } from 'uuid';

// This is an async thunk to simulate fetching products from an API.
// You can replace the simulated call with a real API request (e.g., using axios or fetch).
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return productsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      // In a real app, the backend would generate the ID and other fields.
      const newProduct = { id: `prod-${uuidv4()}`, ...action.payload };
      state.items.unshift(newProduct);
    },
    editProduct: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const productIndex = state.items.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        state.items[productIndex] = { ...state.items[productIndex], ...updatedData };
      }
    },
    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      state.items = state.items.filter(p => p.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;