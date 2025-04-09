import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action (Thunk) for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await fetch('http://localhost:3000/users'); // JSON-server API
    const users = await response.json();
    const user = users.find(
      (u) =>
        u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user; // Return the authenticated user
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
