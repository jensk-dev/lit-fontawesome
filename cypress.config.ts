import { defineConfig } from "cypress";

export default defineConfig({
  includeShadowDom: true,
  screenshotsFolder: "cypress/e2e/screenshots",
  videosFolder: "cypress/e2e/videos",
  fixturesFolder: "cypress/e2e/fixtures",
  downloadsFolder: "cypress/e2e/downloads",
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: "cypress/e2e/**/*.e2e.ts",
    baseUrl: "http://localhost:4173/",
  },
});
