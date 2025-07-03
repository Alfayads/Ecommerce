import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  addresses: [],
  primaryAddressId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const newAddress = { id: uuidv4(), ...action.payload };
      state.addresses.push(newAddress);
      // If it's the first address, make it primary
      if (state.addresses.length === 1) {
        state.primaryAddressId = newAddress.id;
      }
    },
    editAddress: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const addressIndex = state.addresses.findIndex(addr => addr.id === id);
      if (addressIndex !== -1) {
        state.addresses[addressIndex] = { ...state.addresses[addressIndex], ...updatedData };
      }
    },
    deleteAddress: (state, action) => {
      const idToDelete = action.payload;
      state.addresses = state.addresses.filter(addr => addr.id !== idToDelete);
      // If the deleted address was primary, set a new primary if possible
      if (state.primaryAddressId === idToDelete) {
        if (state.addresses.length > 0) {
          state.primaryAddressId = state.addresses[0].id;
        } else {
          state.primaryAddressId = null;
        }
      }
    },
    setPrimaryAddress: (state, action) => {
      const idToSetAsPrimary = action.payload;
      if (state.addresses.some(addr => addr.id === idToSetAsPrimary)) {
        state.primaryAddressId = idToSetAsPrimary;
      }
    },
  },
});

export const { addAddress, editAddress, deleteAddress, setPrimaryAddress } = profileSlice.actions;
export default profileSlice.reducer;

