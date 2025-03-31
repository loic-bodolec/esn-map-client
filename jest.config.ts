import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Uses ts-jest to handle TypeScript files during testing
  testEnvironment: 'jsdom', // Simulates a DOM environment for React testing
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Specifies a setup file to configure Jest after the environment is set up
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS/SCSS files to avoid errors during testing
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/mocks/fileMock.ts', // Mocks image files to avoid errors during testing
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json', // Specifies the TypeScript configuration file for Jest
      },
    ],
  },
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'], // Matches test files with .test.ts/.spec.ts or .test.tsx/.spec.tsx extensions in the src directory
  collectCoverage: true, // Enables code coverage collection
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', // Includes all TypeScript/TSX files in the src directory for coverage
    '!<rootDir>/src/**/*.d.ts', // Excludes TypeScript declaration files from coverage
    '!<rootDir>/src/index.tsx', // Excludes the main entry file from coverage
  ],
  coverageReporters: ['text', 'lcov'], // Specifies the formats for coverage reports: text (console) and lcov (HTML)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognized file extensions for modules
};

export default config;
