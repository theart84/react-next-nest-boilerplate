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
      Так как next из коробки проверяет типы только в prod-режиме,
      подключаем этот плагин. Он занимается проверкой типов и линтингом
      в отдельном от сборки потоке
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
      Данный плагин заменяет вхождения process.env.NAME на константное значение
      в процессе сборки
      Динамически получить доступ через process.env[key] не получится
      Таким образом, в клиентский JS не попадают ненужные переменные окружения
     */
    config.plugins.push(new Dotenv({
      defaults: path.resolve(process.cwd(), '.env'),
      path: path.resolve(process.cwd(), '.env.local'),
    }));

    return config;
  },
};
