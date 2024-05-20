import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const uploadAFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL + '/upload', formData, {
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
