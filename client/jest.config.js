// ./client/jest.config.js
module.exports = {
  displayName: 'client',
  testEnvironmentOptions: {
    url: 'https://til.test.com',
  },
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup-test-framework.js',
  ),
  // import modules in these dirs as if they were regular npm modules:
  // (highly recommended to have some test helpers like these.)
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/svg-file-mock.js',
  },
  snapshotSerializers: ['jest-glamor-react'],
}
