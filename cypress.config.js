const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/', // Set your base URL here
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports'
  }
});