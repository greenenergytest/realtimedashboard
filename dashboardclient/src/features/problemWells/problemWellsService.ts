import axios from 'axios';
import config from '../../config';

export const fetchProblemWells = async (
  fileName: string,
  storedFileName: string,
) => {
  try {
    fileName = storedFileName;
    const response = await axios.post(config.apiBaseUrl + '/getProblemWells', {
      fileName,
      storedFileName,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
