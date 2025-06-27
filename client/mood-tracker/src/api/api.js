import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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