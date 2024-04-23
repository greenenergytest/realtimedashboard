import axios from 'axios';

const API_URL = 'http://localhost:3000';

//login user

const login = async (userData: any) => {
  console.log('in login service');
  console.log(userData);
  try {
    const response = await axios.post(API_URL + '/login', userData, {
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
    console.error('Error', error.response);
  }
};

const authService = { login };

export default authService;
