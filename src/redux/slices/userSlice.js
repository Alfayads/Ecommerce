import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // The user list is now managed dynamically.
  // We start with a default admin user for demonstration purposes.
  // "Original" users will be added via the `addUser` action upon registration.
  users: [
    { id: 'user-admin-01', name: 'Admin User', email: 'admin@example.com', dateJoined: new Date().toISOString(), role: 'Admin' },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUserPayload = action.payload;
      // Prevent adding a user if they already exist (by email)
      if (!state.users.some(user => user.email === newUserPayload.email)) {
        const newUser = {
          id: `user-${uuidv4()}`,
          dateJoined: new Date().toISOString(),
          role: 'User',
          ...newUserPayload,
        };
        state.users.push(newUser);
      }
    },
    updateUserRole: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.role = newRole;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(u => u.id !== userId);
    },
  },
});

export const { addUser, updateUserRole, deleteUser } = userSlice.actions;
export default userSlice.reducer;