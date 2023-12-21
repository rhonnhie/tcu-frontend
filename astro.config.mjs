import { defineConfig } from 'astro/config';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': join(dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
  },
  integrations: [react()],
  adapter: node({
    mode: 'middleware',
  }),
});
