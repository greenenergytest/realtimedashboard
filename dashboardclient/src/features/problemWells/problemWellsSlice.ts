import { createSlice } from '@reduxjs/toolkit';
import { fetchProblemWells } from '../../features/problemWells/problemWellsService';

interface fieldDataState {
  problemWells: string;
}

const initialState: fieldDataState = {
  problemWells: '',
};

export const problemWellsSlice = createSlice({
  name: 'problemWellsData',
  initialState,
  reducers: {
    setProblemWellsName: (state, action) => {
      state.problemWells = action.payload;
    },
  },
});

export const { setProblemWellsName } = problemWellsSlice.actions;

export const fetchProblemWellsData =
  (fileName: string) => async (dispatch: any) => {
    try {
      const response = await fetchProblemWells(fileName);
      //TODO: display problem well
      let notHealthyWells: any = {};
      for (let key in response['wellHealth']) {
        if (response['wellHealth'].hasOwnProperty(key)) {
          if (response['wellHealth'][key] == 'Not Healthy') {
            notHealthyWells[key] = response['wellHealth'][key];
          }
        }
      }

      dispatch(setProblemWellsName(notHealthyWells));
      console.log('not healthy wells');
      console.log(notHealthyWells);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
export default problemWellsSlice.reducer;
