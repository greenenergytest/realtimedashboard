import axios from 'axios';
import config from '../../config';

export const fetchFieldData = async (sheetName: string) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getFieldData', {
      sheetName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
