const { load } = require('dotenv-extended');
const path = require('path');
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

load({
  path: path.resolve(process.cwd(), '.env.local'),
  defaults: path.resolve(process.cwd(), '.env'),
});

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: ['__tests__/.*/*\\.test.tsx?$', '__e2e__/.*/*\\.test.tsx?$'],
  moduleNameMapper,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      includeFailureMsg: true,
      outputPath: 'test-report/index.html',
    }],
    ['jest-email-reporter', {
      from: process.env.AUTO_TESTS_REPORT_EMAIL_FROM,
      to: process.env.AUTO_TESTS_REPORT_EMAIL_TO,
      subject: 'Результат выполнения автоматических тестов',
      reportIfSuccess: true,
    }],
  ],
};
