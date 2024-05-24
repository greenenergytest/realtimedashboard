import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphData } from '../../features/graphData/graphDataService';

interface graphDataState {
  headers: string;
  selectedXColumns: string[];
  selectedYColumns: string[];
  fileName: string;
  xData: string[];
  yData: string[];
}

const initialState: graphDataState = {
  headers: '',
  selectedXColumns: [],
  selectedYColumns: [],
  fileName: '',
  xData: [],
  yData: [],
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
    setYData: (state, action) => {
      state.yData = action.payload;
    },
  },
});

export const {
  selectXColumns,
  selectYColumns,
  selectFileName,
  setXData,
  setYData,
} = graphDataSlice.actions;

export const fetchGraphDataFromBackend =
  (xColumns: any, yColumns: any, fileName: any) => async (dispatch: any) => {
    console.log(fileName);
    console.log(xColumns);
    console.log(yColumns);

    //const { fileName } = getState().data;
    try {
      const response = await fetchGraphData(xColumns, yColumns, fileName);
      console.log(response);
      const formattedDate = getNormalDate(response.xData);

      dispatch(setXData(formattedDate));
      dispatch(setYData(response.yData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const getNormalDate = (serialDates: any) => {
  const formattedDates = serialDates.map((serialDate: any) => {
    const date = new Date((serialDate - 25569) * 86400 * 1000); // Convert serial date to milliseconds
    return formatDate(date);
  });
  return formattedDates;
};

function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default graphDataSlice.reducer;
