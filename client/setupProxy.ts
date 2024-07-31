import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

// Define the setupProxy function
const setupProxy = (app: Express) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Optionally rewrite paths if needed
    })
  );
};

export default setupProxy;
