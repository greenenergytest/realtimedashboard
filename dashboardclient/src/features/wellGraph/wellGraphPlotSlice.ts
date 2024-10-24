import { createSlice } from '@reduxjs/toolkit';
import { fetchWellGraph } from '../../features/wellGraph/wellGraphPlotService';

interface wellGraphState {
  xData: string[];
  primaryYData: string[];
  secondaryYData: string[];
}

const initialState: wellGraphState = {
  xData: [],
  primaryYData: [],
  secondaryYData: [],
};

export const wellGraphDataSlice = createSlice({
  name: 'wellGraphData',
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
  wellGraphDataSlice.actions;

export const fetchWellDataFromBackend =
  (
    xColumns: any,
    primaryYColumns: any,
    fileName: any,
    sheetName: any,
    secondaryYColumns?: any
  ) =>
  async (dispatch: any) => {
    try {
      const response = await fetchWellGraph(
        xColumns,
        primaryYColumns,
        secondaryYColumns,
        fileName,
        sheetName
      );

      const formattedDate = getNormalDate(response.xData);

      dispatch(setXData(formattedDate));
      dispatch(setPrimaryYData(response.yPrimaryData));
      dispatch(setSecondaryYData(response.ySecondaryData));
      return response.yPrimaryData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const getNormalDate = (serialDates: any) => {
  const formattedDates = serialDates.slice(1).map((serialDate: any) => {
    const date = new Date((serialDate - 25569) * 86400 * 1000);
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
export default wellGraphDataSlice.reducer;
