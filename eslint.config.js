import eslint from '@eslint/js';
import reactCompiler from 'eslint-plugin-react-compiler';
import tseslint from 'typescript-eslint';
import { reactCompilerSources } from './reactCompiler.js';

export default tseslint.config(
    eslint.configs.recommended,
    {
        extends: [tseslint.configs.base, tseslint.configs.eslintRecommended],
        rules: {
            'no-array-constructor': 'off',
            'no-unused-expressions': 'off',
            'no-unused-vars': 'off'
        },
        files: reactCompilerSources.flatMap((dir) => [`${dir}/**/*.ts`, `${dir}/**/*.tsx`])
    },
    {
        plugins: {
            'react-compiler': reactCompiler
        },
        rules: {
            'react-compiler/react-compiler': 'error'
        }
    }
);
