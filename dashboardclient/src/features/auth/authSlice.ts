import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//retrieve user from local host
var user: any = {};
var storedUser: any = localStorage.getItem('user');
if (localStorage.getItem('user')) {
  user = JSON.parse(storedUser);
} else {
  user = {};
}
//const user = {};
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const login: any = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      console.log('in login async ');
      const serviceResponse = await authService.login(user);
      return serviceResponse;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {},
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
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
