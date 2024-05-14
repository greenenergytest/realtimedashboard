import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
//import rootReducer, { RootState } from './reducers';
import { authReducer } from './features/auth/authSlice';
import fileUploadReducer from './features/upload/uploadSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
