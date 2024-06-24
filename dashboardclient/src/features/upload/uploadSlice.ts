import {
  createSlice,
  PayloadAction,
  //createAsyncThunk,
  // Slice,
} from '@reduxjs/toolkit';
import { uploadAFile as uploadFileService } from '../../features/upload/uploadService';
import { AppThunk } from '../../store';

interface FileUploadState {
  file: File | null;
  headers: string[];
  fileName: string;
  uploading: boolean;
  uploadSuccess: boolean;
  errorMessage: string | null;
  sheetNames: string[];
}

const initialState: FileUploadState = {
  file: null,
  uploading: false,
  headers: [],
  fileName: '',
  uploadSuccess: false,
  errorMessage: null,
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
    uploadFileStart: (state) => {
      state.uploading = true;
      state.uploadSuccess = false;
      state.errorMessage = null;
    },
    uploadFileSuccess: (state) => {
      state.uploading = false;
      state.uploadSuccess = true;
    },
    uploadFileFailure: (state, action: PayloadAction<string>) => {
      state.uploading = false;
      state.errorMessage = action.payload;
    },
    resetUploadState: (state) => {
      state.file = null;
      state.uploading = false;
      state.uploadSuccess = false;
      state.errorMessage = null;
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
  setSheetNames,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;

// async action to upload file

export const uploadFile =
  (file: File): AppThunk =>
  async (dispatch) => {
    dispatch(uploadFileStart());

    try {
      //console.log(file);
      const response = await uploadFileService(file);
      console.log(response);
      dispatch(setHeaders(response.columnNames));
      dispatch(setFileName(response.fileName));
      dispatch(uploadFileSuccess());
      dispatch(setSheetNames(response.sheetNames));
    } catch (error: any) {
      dispatch(uploadFileFailure(error.message));
    }
  };
