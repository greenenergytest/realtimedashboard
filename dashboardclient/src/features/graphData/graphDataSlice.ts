import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphData } from '../../features/graphData/graphDataService';

interface graphDataState {
  headers: string;
  selectedXColumns: string[];
  selectedYColumns: string[];
  fileName: string;
  xData: string[];
  primaryYData: string[];
  secondaryYData: string[];
  sheetNames: string[];
}

const initialState: graphDataState = {
  headers: '',
  selectedXColumns: [],
  selectedYColumns: [],
  fileName: '',
  xData: [],
  primaryYData: [],
  secondaryYData: [],
  sheetNames: [],
};
export const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    selectXColumns: (state, action) => {
      state.selectedXColumns = action.payload;
    },
    selectYColumns: (state, action) => {
      state.selectedYColumns = action.payload;
    },
    selectFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setXData: (state, action) => {
      state.xData = action.payload;
    },
    setPrimaryYData: (state, action) => {
      state.primaryYData = action.payload;
    },
    setSecondaryYData: (state, action) => {
      state.secondaryYData = action.payload;
    },
    setSheetNames: (state, action) => {
      state.sheetNames = action.payload;
    },
  },
});

export const {
  selectXColumns,
  selectYColumns,
  selectFileName,
  setXData,
  setPrimaryYData,
  setSecondaryYData,
  setSheetNames,
} = graphDataSlice.actions;

export const fetchGraphDataFromBackend =
  (
    xColumns: any,
    primaryYColumns: any,
    fileName: any,
    sheetName: any,
    secondaryYColumns?: any
  ) =>
  async (dispatch: any) => {
    console.log(fileName);
    console.log(xColumns);
    console.log(primaryYColumns);

    //const { fileName } = getState().data;
    try {
      const response = await fetchGraphData(
        xColumns,
        primaryYColumns,
        secondaryYColumns,
        fileName,
        sheetName
      );
      console.log(response);
      const formattedDate = getNormalDate(response.xData);

      console.log('logging formatted dates');
      console.log(formattedDate);

      dispatch(setXData(formattedDate));
      dispatch(setPrimaryYData(response.yPrimaryData));
      dispatch(setSecondaryYData(response.ySecondaryData));
      dispatch(setSheetNames(response.sheetNames));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const getNormalDate = (serialDates: any) => {
  console.log('logging serial dates');
  console.log(serialDates);
  console.log('logging serial dates slice');
  console.log(serialDates.slice(2));
  const formattedDates = serialDates.slice(1).map((serialDate: any) => {
    const date = new Date((serialDate - 25569) * 86400 * 1000); // Convert serial date to milliseconds
    return formatDate(date);
  });
  formattedDates[0] = '';
  return formattedDates;
};

function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default graphDataSlice.reducer;
