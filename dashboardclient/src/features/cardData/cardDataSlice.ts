import { createSlice } from '@reduxjs/toolkit';
import { fetchCardData } from '../../features/cardData/cardDataService';

interface fetchCardDataState {
  chokeData: string;
  fthpData: string; // fthp : flow tubing head pressure
  condensateRateData: string;
  gasRateData: string;
  waterCutData: string;
  gasOilRatioData: string;
  condensateCummData: string;
  oilRateData: string;
}

const initialState: fetchCardDataState = {
  chokeData: '',
  fthpData: '',
  condensateRateData: '',
  gasRateData: '',
  waterCutData: '',
  gasOilRatioData: '',
  condensateCummData: '',
  oilRateData: '',
};

export const cardDataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
    setChokeData: (state, action) => {
      state.chokeData = action.payload;
    },
    setFthpData: (state, action) => {
      state.fthpData = action.payload;
    },
    setCondensateRateData: (state, action) => {
      state.condensateRateData = action.payload;
    },
    setGasRateData: (state, action) => {
      state.gasRateData = action.payload;
    },
    setWaterCutData: (state, action) => {
      state.waterCutData = action.payload;
    },
    setGasOilRatioData: (state, action) => {
      state.gasOilRatioData = action.payload;
    },
    setCondensateCummData: (state, action) => {
      state.condensateCummData = action.payload;
    },
    setOilRateData: (state, action) => {
      state.oilRateData = action.payload;
    },
  },
});

export const {
  setChokeData,
  setFthpData,
  setCondensateRateData,
  setGasRateData,
  setWaterCutData,
  setGasOilRatioData,
  setCondensateCummData,
  setOilRateData,
} = cardDataSlice.actions;

export const fetchCardDetails =
  (sheetName: string) => async (dispatch: any) => {
    try {
      const response = await fetchCardData(sheetName);

      console.log('card details response');
      console.log(response);

      dispatch(setChokeData(response.currentChoke));
      dispatch(setFthpData(response.currentFTHP));
      dispatch(setCondensateRateData(response.currentCondensateRate));
      dispatch(setGasRateData(response.currentGasRate));
      dispatch(setWaterCutData(response.currentWaterCut));
      dispatch(setGasOilRatioData(response.currentGasOilRatio));
      dispatch(setCondensateCummData(response.currentCondensateCumm));
      dispatch(setOilRateData(response.currentOilRate));
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
export default cardDataSlice.reducer;
