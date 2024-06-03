import axios from 'axios';
import config from '../../config';

//const API_URL = 'http://localhost:3000';

export const uploadAFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(config.apiBaseUrl + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};
