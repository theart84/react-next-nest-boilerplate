const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      /*
        TODO this plugin need for production build mode
        issue: https://github.com/storybookjs/storybook/issues/12952
        after fix:
        Remove plugin
        Remove --no-dll in package.json
       */
      '@babel/plugin-transform-react-jsx',
    ],
  }),
  webpackFinal: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
};
