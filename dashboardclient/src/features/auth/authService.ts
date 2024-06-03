import axios from 'axios';
import config from '../../config';

//const API_URL = 'http://localhost:3000';

//Register user
const register = async (userData: any) => {
  console.log('in register service');
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

    if ((response.status = 200 && response.data)) {
      console.log('storing user to local host');
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.log('in error register');
    console.error('Error', error.response);
    throw error.response;
  }
};

//login user
const login = async (userData: any) => {
  console.log('in login service');
  console.log(userData);
  try {
    const response = await axios.post(config.apiBaseUrl + '/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if ((response.status = 200 && response.data)) {
      console.log('storing user to local host');
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.log('in error login');
    console.error('Error', error.response);
    throw error.response;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { login, logout, register };

export default authService;
