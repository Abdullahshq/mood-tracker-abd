import axios from 'axios';

// Determine the base URL based on the environment
const isProduction = process.env.NODE_ENV === 'production';
// Replace this with your actual production URL
const productionUrl = 'https://abdapp-dxd2ebhrc9f8cwgm.canadacentral-01.azurewebsites.net/api';
const developmentUrl = '/api'; 

const baseURL = isProduction ? productionUrl : developmentUrl;

const api = axios.create({
  baseURL: baseURL,
});

// This interceptor runs before every request
api.interceptors.request.use(
  (config) => {
    // Get the user object from localStorage
    const userString = localStorage.getItem('user');
    
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        // If the user and token exist, add the token to the Authorization header
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 