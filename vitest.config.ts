import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        // vitest 4 still nests vite 7 internally, which conflicts with our root vite 8
        // Plugin types. Remove this cast once vitest ships with vite 8 support.
        react() as never,
    ],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./tests/js/setup.ts'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
});
