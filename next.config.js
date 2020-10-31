const CircularDependencyPlugin = require('circular-dependency-plugin');
const Dotenv = require('dotenv-webpack');

/*
Eslint plugin не используется, так как сильно замедляет сборку

Eslint loader не используется, так как deprecated

ForkTsChecker plugin не используется из-за бага,
при котором проверка типов происходит дважды

В dev-режиме проверкой типов и линтингом занимается IDE

В prod-режиме доступна только проверка типов
 */
module.exports = {
  webpack: (config) => {
    config.plugins.push(new CircularDependencyPlugin({
      exclude: /node_modules/,
    }));

    /*
    Данный плагин заменяет вхождения process.env.NAME на константное значение
    в процессе сборки
    Динамически получить доступ через process.env[key]) не получится
    Таким образом, в клиентский JS не попадают ненужные переменные окружения
     */
    config.plugins.push(new Dotenv());

    return config;
  }
};
