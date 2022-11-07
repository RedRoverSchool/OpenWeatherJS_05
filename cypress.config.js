const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 7000,
    e2e: {
        setupNodeEvents(on, config) {
          // implement node event listeners here
        },
    },
    video: false,
    reporter: 'junit',
    reporterOptions: {
        mochaFile: 'reports/test-results-[hash].xml',
    },
});
