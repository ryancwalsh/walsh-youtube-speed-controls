// Remember to install and enable the VSCode plugin for Prettier.
// Remember to edit .vscode/settings.json like in https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

// https://prettier.io/docs/en/options.html
// eslint-disable-next-line no-undef
module.exports = {
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
};
