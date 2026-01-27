import {
  createSlice,
  PayloadAction,
  UnknownAction,
  //createAsyncThunk,
  // Slice,
} from '@reduxjs/toolkit';
import { uploadAFile as uploadFileService } from '../../features/upload/uploadService';
import { AppThunk } from '../../store';

interface FileUploadState {
  file: File | null;
  headers: string[];
  fileName: string;
  storedFileName: string;
  uploading: boolean;
  uploadSuccess: boolean;
  errorMessage: { message: string };
  sheetNames: string[];
}

const initialState: FileUploadState = {
  file: null,
  uploading: false,
  headers: [],
  fileName: '',
  storedFileName: '',
  uploadSuccess: false,
  errorMessage: { message: '' },
  sheetNames: [],
};

export const fileUploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setStoredFileName: (state, action) => {
      state.storedFileName = action.payload;
    },
    uploadFileStart: (state) => {
      state.uploading = true;
      state.uploadSuccess = false;
      state.errorMessage.message = '';
    },
    uploadFileSuccess: (state) => {
      state.uploading = false;
      state.uploadSuccess = true;
    },
    uploadFileFailure: (state, action: PayloadAction<string>) => {
      state.uploading = false;
      state.errorMessage.message = action.payload;
    },
    resetUploadState: (state) => {
      state.file = null;
      state.uploading = false;
      state.uploadSuccess = false;
      state.errorMessage.message = '';
    },
    setSheetNames: (state, action) => {
      state.sheetNames = action.payload;
    },
  },
});

export const {
  setFile,
  setHeaders,
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
  resetUploadState,
  setFileName,
  setStoredFileName,
  setSheetNames,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;

// async action to upload file

export const uploadFile =
  (file: File): AppThunk =>
  async (dispatch) => {
    dispatch(uploadFileStart());

    try {
      const response = await uploadFileService(file);
      dispatch(setStoredFileName(response.storedFileName));
      dispatch(setHeaders(response.columnNames));
      dispatch(setFileName(response.fileName));
      dispatch(uploadFileSuccess());
      dispatch(setSheetNames(response.sheetNames));
    } catch (error: any) {
      dispatch(uploadFileFailure(error.message));
    }
  };
