import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    itemIds: [], // Store only product IDs for efficiency
  },
  reducers: {
    toggleWishlistItem: (state, action) => {
      const id = action.payload;
      const isWishlisted = state.itemIds.includes(id);

      if (isWishlisted) {
        // Item exists, so remove it by filtering
        state.itemIds = state.itemIds.filter((itemId) => itemId !== id);
      } else {
        // Item does not exist, so add it
        state.itemIds.push(id);
      }
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;