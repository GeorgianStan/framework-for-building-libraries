module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['test/**/*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-var': 2,
    'no-useless-constructor': 2,
    'no-duplicate-imports': 2,
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-destructuring': 2,
    'no-invalid-this': 2,
    'no-loop-func': 2,
    'arrow-body-style': 2,
  },
};
