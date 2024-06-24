import axios from 'axios';
import config from '../../config';

export const fetchCardData = async (sheetName: string) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getCardData', {
      sheetName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
