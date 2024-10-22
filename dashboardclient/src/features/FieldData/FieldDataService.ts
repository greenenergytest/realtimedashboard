import axios from 'axios';
import config from '../../config';

export const fetchFieldData = async (sheetName: string, fileName: string) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getFieldData', {
      sheetName,
      fileName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
