import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
