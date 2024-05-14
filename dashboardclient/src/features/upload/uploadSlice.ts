import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Slice,
} from '@reduxjs/toolkit';
import { uploadAFile as uploadFileService } from '../../features/upload/uploadService';
import { AppThunk } from '../../store';

interface FileUploadState {
  file: File | null;
  uploading: boolean;
  uploadSuccess: boolean;
  errorMessage: string | null;
}

const initialState: FileUploadState = {
  file: null,
  uploading: false,
  uploadSuccess: false,
  errorMessage: null,
};

export const fileUploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    uploadFileStart: (state) => {
      state.uploading = true;
      state.uploadSuccess = false;
      state.errorMessage = null;
    },
    uploadFileSuccess: (state, action) => {
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
  },
});

export const {
  setFile,
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
  resetUploadState,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;

// async action to upload file

export const uploadFile =
  (file: File): AppThunk =>
  async (dispatch) => {
    dispatch(uploadFileStart());

    try {
      console.log(file);
      await uploadFileService(file);
      dispatch(uploadFileSuccess(true));
    } catch (error: any) {
      dispatch(uploadFileFailure(error.message));
    }
  };
