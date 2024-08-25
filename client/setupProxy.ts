import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';
import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api'
});

// Define the setupProxy function
const setupProxy = (app: Express) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001', // Points to your server
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Rewrites the path if necessary
    })
  );
};

export default setupProxy;

