/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['build'],
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: ['src/app.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {isolatedModules: true}]
  }
};