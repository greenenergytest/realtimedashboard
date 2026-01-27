import axios from 'axios';
import config from '../../config';

//serve all documents
const getAllDocuments = async () => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/getDocuments', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Error', error);
    throw error;
  }
};

const deleteDocument = async (fileName: string) => {
  try {
    const response = await axios.post(
      config.apiBaseUrl + '/deleteDocument',
      { fileName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.error('Error', error);
    throw error;
  }
};
const documentService = { getAllDocuments, deleteDocument };
export default documentService;
