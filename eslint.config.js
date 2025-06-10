import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';
import soyluisarrietaESlint from '@soyluisarrieta/eslint'


/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    ...typescript.configs.recommended,
    soyluisarrietaESlint,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'], // Required for React 17+
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        ignores: [
          'vendor', 
          'node_modules', 
          'public', 
          'bootstrap/ssr', 
          'tailwind.config.js', 
          'dist',
          'resources/js/components/ui'
        ],
    }
];
