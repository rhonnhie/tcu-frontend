import express from 'express';
import { handler } from './dist/server/entry.mjs';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app

  .use('/', express.static('./dist/client/'))

  .use(
    '/api',
    createProxyMiddleware({
      target: 'https://taguig-backend.onrender.com',
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/^\/api/, ''),
    }),
  )

  .use(handler);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
