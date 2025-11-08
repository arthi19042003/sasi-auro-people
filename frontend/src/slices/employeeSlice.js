import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
  const res = await api.get('/employees');
  return res.data.employees || [];
});

const slice = createSlice({
  name: 'employees',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchEmployees.fulfilled, (s, action) => { s.loading = false; s.list = action.payload; })
      .addCase(fetchEmployees.rejected, (s, action) => { s.loading = false; s.error = action.error.message; });
  }
});

export default slice.reducer;
