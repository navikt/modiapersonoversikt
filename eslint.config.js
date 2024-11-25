// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettier,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked]
    },
    {
        ignores: ['build/', 'src/mock/mock-websocket.ts']
    },
    {
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/unbound-method': ['off'],
            '@typescript-eslint/no-unused-expressions': ['warn'],
            '@typescript-eslint/no-floating-promises': ['off'],
            '@typescript-eslint/no-misused-promises': ['off'],
            '@typescript-eslint/no-explicit-any': ['warn']
        }
    }
);
