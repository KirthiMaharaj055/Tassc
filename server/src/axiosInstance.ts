// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/api', // Update with your API base URL
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API
// src/utils/axiosInstance.ts
import axios from 'axios';

// Create an axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api', // Set base URL from environment variables
  timeout: 10000, // Optional: Set timeout for requests
});

// Add a request interceptor to include authentication tokens from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Fetch token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., redirect to login on 401 errors)
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
