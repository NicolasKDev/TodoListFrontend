import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  // Configuration pour ignorer les dossiers
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.vite/**', '*.min.js', '*.bundle.js'],
  },
  // Configuration principale
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended', prettierConfig],
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          printWidth: 100,
          bracketSpacing: true,
          arrowParens: 'always',
          vueIndentScriptAndStyle: true,
          htmlWhitespaceSensitivity: 'strict',
          endOfLine: 'lf',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
])
