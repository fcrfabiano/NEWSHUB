import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
    {
        rules: {
            quotes: ['error', 'single', { avoidEscape: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'always'],
            'space-in-parens': ['error', 'always'],
            indent: ['error', 4, { SwitchCase: 1 }],
        },
    },
]);

export default eslintConfig;
