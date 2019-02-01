module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  testMatch: ["**/tests/spec/**/*.test.js"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "css", "less"],
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|svg|css|less)$": "<rootDir>/tests/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  testEnvironment: "jsdom"
};
