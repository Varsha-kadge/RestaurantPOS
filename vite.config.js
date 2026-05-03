import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    //allowedHosts: ['https://bryce-unseducible-zaida.ngrok-free.dev']
  }
});
