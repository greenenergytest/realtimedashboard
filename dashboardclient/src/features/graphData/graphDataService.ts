import axios from 'axios';
import config from '../../config';

//const API_URL = 'http://localhost:3000';

export const fetchGraphData = async (
  selectedXColumns: any,
  selectedPrimaryYColumns: any,
  selectedSecondaryYColumns: any,
  fileName: any,
  sheetName: any
) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getGraphData', {
      selectedXColumns,
      selectedPrimaryYColumns,
      selectedSecondaryYColumns,
      fileName,
      sheetName,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
