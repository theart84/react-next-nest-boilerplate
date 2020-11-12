const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      /*
        TODO данный плагин необходим только в prod режиме
        issue: https://github.com/storybookjs/storybook/issues/12952
        После исправления данного бага, необходимо удалить его подключение
        А также удалить флаг --no-dll флаг при сборке в package.json
       */
      '@babel/plugin-transform-react-jsx',
    ],
  }),
  webpackFinal: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
};
