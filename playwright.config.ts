import { devices, PlaywrightTestConfig } from "@playwright/test";
import path from "path";

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, "e2e"),
  retries: 0,
  outputDir: "__reports__/e2e",
  webServer: {
    command: "npm run dev",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: "retry-with-trace",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};
export default config;
