const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
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
