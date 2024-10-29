const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // src 폴더를 기준으로 변경
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
