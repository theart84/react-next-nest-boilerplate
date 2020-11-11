const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack: (config, options) => {
    const { dev, isServer } = options;

    config.plugins.push(new CircularDependencyPlugin({
      exclude: /node_modules/,
    }));

    /*
      Since next.js checks types out of the box only in prod mode, we include this plugin.
      Type checking and linting happens in a separate thread from the build.
     */
    if (dev && isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            enabled: true,
            files: './src/**/*.{ts,tsx}',
          },
        }),
      );
    }

    /*
      This plugin replaces occurrences of process.env.NAME with a constant value during the build process.
      Dynamically accessing via process.env [key] will fail
      Thus, unnecessary environment variables do not get into client JS.
     */
    config.plugins.push(new Dotenv({
      path: path.resolve(__dirname, '../.env'),
    }));

    return config;
  },
};
