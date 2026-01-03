import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, endpoint } from '../config/endpoint';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload, { rejectWithValue }) => {
    if (!API_BASE_URL) {
      return rejectWithValue({ status: 400, message: 'API_BASE_URL not configured' });
    }
    try {
      const url = endpoint('/user/createUser');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue({ status: res.status, message: text || res.statusText });
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue({ status: 0, message: err.message || String(err) });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    if (!API_BASE_URL) {
      return rejectWithValue({ status: 400, message: 'API_BASE_URL not configured' });
    }
    try {
      const url = endpoint('/user/getAllUsers');
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue({ status: res.status, message: text || res.statusText });
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue({ status: 0, message: err.message || String(err) });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
    list: [],
    listStatus: 'idle',
    listError: null,
  },
  reducers: {
    clearUser(state) {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
    clearUsers(state) {
      state.list = [];
      state.listStatus = 'idle';
      state.listError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.listStatus = 'pending';
        state.listError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.list = action.payload || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.listError = action.payload || action.error;
      });
  },
});

export const { clearUser, clearUsers } = userSlice.actions;
export const selectUserData = (state) => state.user.data;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUsersList = (state) => state.user.list;
export const selectUsersStatus = (state) => state.user.listStatus;
export const selectUsersError = (state) => state.user.listError;

export default userSlice.reducer;