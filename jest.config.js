module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react|@lucide)/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironmentOptions: {
    customExportConditions: [''],
    url: 'http://localhost'
  },
  // Add performance optimizations:
  maxWorkers: '50%',
  testTimeout: 10000,
  cache: true,
  maxConcurrency: 5
}