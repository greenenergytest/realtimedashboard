import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
//import rootReducer, { RootState } from './reducers';
import { authReducer } from './features/auth/authSlice';
import fileUploadReducer from './features/upload/uploadSlice';
import graphDataReducer from './features/graphData/graphDataSlice';
import cardDataReducer from './features/cardData/cardDataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    graphData: graphDataReducer,
    cardData: cardDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
