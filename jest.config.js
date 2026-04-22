module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['tests/e2e'],
};

// Run E2E tests separately:
//   npx jest --config jest.e2e.config.js
