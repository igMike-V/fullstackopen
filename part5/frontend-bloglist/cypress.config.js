import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on("file:preprocessor", vitePreprocessor());
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    BACKEND: 'http://localhost:3003/api'
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
