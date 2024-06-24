import { createSlice } from '@reduxjs/toolkit';
import { fetchColumnNames } from '../../features/columnNames/columnNamesService';

interface columnNameState {
  columnNames: string[];
}

const initialState: columnNameState = {
  columnNames: [],
};

export const columnNamesSlice = createSlice({
  name: 'columNameData',
  initialState,
  reducers: {
    setColumnNames: (state, action) => {
      state.columnNames = action.payload;
    },
  },
});

export const { setColumnNames } = columnNamesSlice.actions;

export const getColumnNames =
  (fileName: any, sheetName: any) => async (dispatch: any) => {
    try {
      const response = await fetchColumnNames(fileName, sheetName);
      console.log(response);

      dispatch(setColumnNames(response.columnNames));
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };

export default columnNamesSlice.reducer;
