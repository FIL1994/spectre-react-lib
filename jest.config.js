module.exports = {
  collectCoverageFrom: ["src/**/*.{js}"],
  testMatch: ["**/tests/spec/**/*.js?(x)"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "css", "less"],
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|svg|css|less)$": "<rootDir>/tests/fileMock.js"
  },
  testEnvironment: "jsdom"
};
