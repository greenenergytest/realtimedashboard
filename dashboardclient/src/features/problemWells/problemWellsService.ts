import axios from 'axios';
import config from '../../config';

export const fetchProblemWells = async (fileName: string) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getProblemWells', {
      fileName,
    });
    console.log('logging out the response of problem wells');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
