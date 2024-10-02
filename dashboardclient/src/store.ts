import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
//import rootReducer, { RootState } from './reducers';
import { authReducer } from './features/auth/authSlice';
import fileUploadReducer from './features/upload/uploadSlice';
import graphDataReducer from './features/graphData/graphDataSlice';
import cardDataReducer from './features/cardData/cardDataSlice';
import columnNamesReducer from './features/columnNames/columnNamesSlice';
import fieldDataReducer from './features/FieldData/FieldDataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    graphData: graphDataReducer,
    cardData: cardDataReducer,
    columnData: columnNamesReducer,
    fieldData: fieldDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
