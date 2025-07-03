import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  signupData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      // Set the loading state to true and reset any previous errors when a login request is initiated
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      console.log("Login Success:", state.user);
    },

    authFailure: (state, action) => {
      // Handle login failure by setting the error and resetting loading state
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailure, // Add the logout action
  logout,
} = authSlice.actions;

export default authSlice.reducer;
