import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
    base: '/navigation/',
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    optimizeDeps: {
        exclude: ['unified-shell'],
    },
    build: {
        rollupOptions: {
            external: ['unified-shell/**/*'],
        },
    },
    define: {
        'process.env': {},
        'process.browser': true,
        'process.version': '"0.0.0"',
        'process': {
            env: {},
            browser: true,
            version: '"0.0.0"'
        }
    }
});
