const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.customMatchers.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  resolver: "<rootDir>/jest.resolver.js",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  nextJestConfig.transformIgnorePatterns[0] = "/node_modules/(?!nanoid)/";
  return nextJestConfig;
}

module.exports = jestConfig;
