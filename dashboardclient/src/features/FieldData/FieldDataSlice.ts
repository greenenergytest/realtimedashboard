import { createSlice } from '@reduxjs/toolkit';
import { fetchFieldData } from '../../features/FieldData/FieldDataService';

interface fieldDataState {
  sheetName: string;
  cummData: string;
  waterCutData: string;
  gorData: string;
  rateData: string;
}

const initialState: fieldDataState = {
  sheetName: '',
  cummData: '',
  waterCutData: '',
  gorData: '',
  rateData: '',
};

export const FieldDataSlice = createSlice({
  name: 'fieldData',
  initialState,
  reducers: {
    setCummData: (state, action) => {
      state.cummData = action.payload;
    },
    setWaterCutData: (state, action) => {
      state.waterCutData = action.payload;
    },
    setGorData: (state, action) => {
      state.gorData = action.payload;
    },
    setRateData: (state, action) => {
      state.rateData = action.payload;
    },
  },
});

export const { setCummData, setWaterCutData, setGorData, setRateData } =
  FieldDataSlice.actions;

export const fetchFieldDetails =
  (sheetName: string, fileName: string) => async (dispatch: any) => {
    try {
      const response = await fetchFieldData(sheetName, fileName);
      console.log(response);
      dispatch(setCummData(response.currentCummulative));
      dispatch(setWaterCutData(response.currentWaterCut));
      dispatch(setGorData(response.currentGor));
      dispatch(setRateData(response.currentOilRate));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
export default FieldDataSlice.reducer;
