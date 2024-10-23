import { createSlice } from '@reduxjs/toolkit';
import { fetchFieldGraphData } from './fieldGraphService';

interface fieldGraphDataState {
  xData: string[];
  primaryYData: string[];
  secondaryYData: string[];
}

const initialState: fieldGraphDataState = {
  xData: [],
  primaryYData: [],
  secondaryYData: [],
};

export const fieldGraphDataSlice = createSlice({
  name: 'fieldGraphData',
  initialState,
  reducers: {
    setXData: (state, action) => {
      state.xData = action.payload;
    },
    setPrimaryYData: (state, action) => {
      state.primaryYData = action.payload;
    },
    setSecondaryYData: (state, action) => {
      state.secondaryYData = action.payload;
    },
  },
});

export const { setXData, setPrimaryYData, setSecondaryYData } =
  fieldGraphDataSlice.actions;

export const fetchFieldGraphDataFromBackend =
  (
    sheetName: any,
    xColumns: any,
    primaryYColumns: any,
    secondaryYColumns: any
  ) =>
  async (dispatch: any) => {
    try {
      const response = await fetchFieldGraphData(
        sheetName,
        xColumns,
        primaryYColumns,
        secondaryYColumns
      );
      console.log('Logging response of field graph data');
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

export default fieldGraphDataSlice.reducer;
