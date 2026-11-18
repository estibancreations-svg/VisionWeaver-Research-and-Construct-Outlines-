Original name: vite.config.ts
Drive ID: 1sQDrOvNi-xw4qXN_uhYCStprKNZwYcUM
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/
Modified: 2026-01-31T10:56:50.000Z

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
