/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
    'standard'
  ],
  compilerOptions: {
    lib: ['dom', 'es6']
  },
  env: {
    'cypress/globals': true
  },
  plugins: ['cypress'],
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 28
    }
  },
  globals: {
    FormDataEntryValue: 'readonly'
  },
  rules: {
    'no-console': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    indent: ['error', 2]
  }
}
