import axios from 'axios';
import config from '../../config';

export const fetchWellGraph = async (
  selectedXColumns: any,
  selectedPrimaryYColumns: any,
  selectedSecondaryYColumns: any,
  fileName: any,
  sheetName: any,
  storedFileName: any,
) => {
  try {
    console.log('logging out file name frontend');
    console.log(fileName);
    console.log('logging out stored file name frontend');
    console.log(storedFileName[0]);
    fileName = storedFileName;
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
