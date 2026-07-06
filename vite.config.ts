import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          about: path.resolve(__dirname, "about.html"),
          community: path.resolve(__dirname, "community.html"),
          contact: path.resolve(__dirname, "contact.html"),
          contact_us: path.resolve(__dirname, "contact-us.html"),
          merch: path.resolve(__dirname, "merch.html"),
          music: path.resolve(__dirname, "music.html"),
          tour: path.resolve(__dirname, "tour.html"),
          vault: path.resolve(__dirname, "vault.html"),
          videos: path.resolve(__dirname, "videos.html"),
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
