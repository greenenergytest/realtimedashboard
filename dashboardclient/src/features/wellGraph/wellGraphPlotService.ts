import axios from 'axios';
import config from '../../config';

export const fetchWellGraph = async (
  selectedXColumns: any,
  selectedPrimaryYColumns: any,
  selectedSecondaryYColumns: any,
  fileName: any,
  sheetName: any
) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getWellGraph', {
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
