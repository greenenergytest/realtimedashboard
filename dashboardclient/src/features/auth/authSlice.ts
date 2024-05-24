import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// import * as CircularJSON from 'circular-json';
// import { useDispatch } from 'react-redux';

//retrieve user from local host
var user: any = {};
var storedUser: any = localStorage.getItem('user');
if (localStorage.getItem('user')) {
  user = JSON.parse(storedUser);
} else {
  user = {};
}
//const user = {};

interface UploadState {
  user: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  loading: boolean;
  data: null;
  error: null;
  // loading: boolean;
  // error: string | null;
  // uploadedFileUrl: string | null;
}
// const initialState: UploadState = {
//   loading: false,
//   error: null,
//   uploadedFileUrl: null,
// };
const initialState: UploadState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  loading: false,
  data: null,
  error: null,
};

export const register: any = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      console.log('in register async');
      const registerServiceResponse = await authService.register(user);
      return registerServiceResponse;
    } catch (error: any) {
      console.log('In catch error');
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const login: any = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      console.log('in login async ');
      const loginServiceResponse = await authService.login(user);
      return loginServiceResponse;
    } catch (error: any) {
      console.log('In catch error');
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const logout: any = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payloads);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export const authReducer = authSlice.reducer;
