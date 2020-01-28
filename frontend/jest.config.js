module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: { "^.+\\.jsx?$": "<rootDir>/tests/transform.js" },
  transformIgnorePatterns: ["/node_modules/(?!@carbon)"],
  setupFiles: [ "<rootDir>/tests/setup.js" ],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["lcov", "text"]
};
