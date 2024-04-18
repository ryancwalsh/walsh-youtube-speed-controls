/* eslint-disable canonical/sort-keys */
// https://eslint.org/docs/latest/use/configure/configuration-files-new
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: [
    // 'next/core-web-vitals',
    'canonical/auto',
  ],
  rules: {
    'canonical/filename-match-exported': 'off', // TODO: Disable it just for Next.js page.tsx and route.ts files.
    'func-style': 'off',
    'react/function-component-definition': 'off',
    // https://eslint.org/docs/latest/rules/max-len
    'max-len': [
      'warn',
      {
        code: 180,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // https://eslint.org/docs/rules/max-lines
    'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],

    // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],

    // https://eslint.org/docs/latest/rules/no-console
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // 'no-console': ['warn'],

    'react/forbid-component-props': 'off',

    // https://github.com/prettier/eslint-plugin-prettier#options
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        endOfLine: 'auto', // https://stackoverflow.com/a/53769213/
        // overrides: [
        //   {
        //     files: 'Routes.js',
        //     options: {
        //       printWidth: 200,
        //     },
        //   },
        // ],
        printWidth: 180,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],

    /* Use https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping (from canonical) instead of 'import/order' 
    and note that eslint-config-canonical had overridden the defaults as mentioned in 
    https://github.com/lydell/eslint-plugin-simple-import-sort/issues/150#issuecomment-1806919274: */
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Files ending with .css or .scss. https://github.com/lydell/eslint-plugin-simple-import-sort/issues/150#issuecomment-1807188122
          ['\\.s?css$'],
        ],
      },
    ],
  },
};
