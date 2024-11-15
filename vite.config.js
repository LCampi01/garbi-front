import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip'
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: './firebase-messagin-sw.js', // correct path to this file.
          dest: './', // root of your output directory
        },
      ],
    }),
  ],
});
