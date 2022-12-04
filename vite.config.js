import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [solidPlugin(), viteSingleFile()],
  server: {
    port: 3000,
    proxy: {
      '/u': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/i': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
