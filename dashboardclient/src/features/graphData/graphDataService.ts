import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchGraphData = async (
  selectedXColumns: any,
  selectedYColumns: any,
  fileName: any
) => {
  try {
    const response = await axios.post(API_URL + '/getGraphData', {
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
