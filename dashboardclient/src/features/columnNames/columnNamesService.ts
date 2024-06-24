import axios from 'axios';
import config from '../../config';

export const fetchColumnNames = async (fileName: any, sheetName: any) => {
  try {
    const response = await axios.post(config.localUrl + '/getColumnNames', {
      fileName,
      sheetName,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
