import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2'
// import vitePluginRaw from 'vite-plugin-raw';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 7500
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    // chunkSizeWarningLimit: 600,
    // cssCodeSplit: false
  },
});
