const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  webpackFinal: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
};
