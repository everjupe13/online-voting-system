/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],

  plugins: [
    'simple-import-sort',
    'import',
    'prettier'
  ],

  parserOptions: {
    ecmaVersion: 'latest'
  },

  ingorePatterns: ['.eslintrc.cjs'],

  rules: {
    'no-console': 'warn',
    curly: 'error',

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',

    'no-unused-vars': 'off',

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration[source.value="lodash"]',
        message: 'Do not import huge vanilla lodash. Use lodash-es'
      }
    ],

    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'import/newline-after-import': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error'
  }
}
