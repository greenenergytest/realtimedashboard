import axios from 'axios';
import config from '../../config';

//const API_URL = 'http://localhost:3000';

export const fetchGraphData = async (
  selectedXColumns: any,
  selectedYColumns: any,
  fileName: any
) => {
  try {
    const response = await axios.post(config.localUrl + '/getGraphData', {
      selectedXColumns,
      selectedYColumns,
      fileName,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
