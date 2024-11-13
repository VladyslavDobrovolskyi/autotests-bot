/** @type {import('jest').Config} */
const os = require("node:os");

const config = {
  testEnvironment: "allure-jest/jsdom",
  testEnvironmentOptions: {
    environmentInfo: {
      os_platform: os.platform(),
      os_release: os.release(),
      os_version: os.version(),
      node_version: process.version,
    },
  },
  testMatch: ["**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};

module.exports = config;
