const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    defaultCommandTimeout: 7000,
    e2e: {
        baseUrl: 'https://openweathermap.org',
        setupNodeEvents(on, config) {
          // implement node event listeners here
        },
    },
    env: {
        apiBaseUrl: 'https://restful-booker.herokuapp.com'
    },
    video: false,
    reporter: 'junit',
    reporterOptions: {
        mochaFile: 'reports/test-results-[hash].xml',
    },
});
