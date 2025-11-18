import axios from 'axios';
import config from '../../config';

//Register user
const register = async (userData: any) => {
  try {
    const response = await axios.post(
      config.apiBaseUrl + '/register',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status == 200 && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error: any) {
    console.error('Error', error.response);
    throw error.response;
  }
};

//login user
const login = async (userData: any) => {
  try {
    const response = await axios.post(config.apiBaseUrl + '/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status == 200 && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    console.error('Error', error.response);
    throw error.response;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { login, logout, register };

export default authService;
