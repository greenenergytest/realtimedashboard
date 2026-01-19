import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import documentsService from './documentsService';

interface documentState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  documents: Record<string, any>;
}

const initialState: documentState = {
  documents: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// const initialDocumentState : documentState =  {

// }

export const getAllDocuments = createAsyncThunk(
  'documents/getAllDocuments',
  async (docs, { rejectWithValue }) => {
    try {
      const doucmentServiceResponse = await documentsService.getAllDocuments();
      return doucmentServiceResponse;
    } catch (error: unknown) {
      console.error('Error', error);
      return rejectWithValue(error);
    }
  }
);

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.documents = {};
    },
  },

  //   extrareducers:(builder) => {
  //     .addCase(login.pending, (state)=> {
  //         state.isLoading = true
  //     })
  //     .addCase(login.fulfilled, (state, action)=> {

  //     })
  //     .addCase(login)
  //   }
});
//export const  { } =

// export const {}
export const documentReducer = documentSlice.reducer;
