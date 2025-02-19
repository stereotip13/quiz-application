import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //https: {
    //  key: fs.readFileSync('C:/Users/MayakovskyAA/key.pem'),
    //  cert: fs.readFileSync('C:/Users/MayakovskyAA/cert.pem'),
    //},
    host: true,
    port: 5173,
  },
});
