import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchLoginData = createAsyncThunk('auth/fetchLoginData', async (loginParams) => {
  const { data } = await axios.post('/auth/login', loginParams);
  return data;
});

export const fetchRegisterData = createAsyncThunk('auth/fetchLoginData', async (registerParams) => {
  const { data } = await axios.post('/auth/register', registerParams);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState = {
  userData: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userData = null;
    },
  },
  extraReducers: {
    //login
    [fetchLoginData.pending]: (state) => {
      state.status = 'loading';
      state.userData = null;
    },
    [fetchLoginData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.userData = action.payload;
    },
    [fetchLoginData.rejected]: (state) => {
      state.status = 'error';
      state.userData = null;
    },
    //sign up
    [fetchRegisterData.pending]: (state) => {
      state.status = 'loading';
      state.userData = null;
    },
    [fetchRegisterData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.userData = action.payload;
    },
    [fetchRegisterData.rejected]: (state) => {
      state.status = 'error';
      state.userData = null;
    },
    // check authentication
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.userData = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.userData = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.userData = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
export const AuthSelector = (state) => Boolean(state.auth.userData);
