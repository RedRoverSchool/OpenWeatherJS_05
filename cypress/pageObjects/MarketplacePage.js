class MarketplacePage {
      elements = {
            getH1CustomWeatherProducts: () => cy.get('div #custom_weather_products h1'),
            getAllProductTitles: () => cy.get('.market-place a[href]:not(.button-round)'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getAllProductTitles: () => cy.get('.market-place .product h5 a'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getMarketplacePageTitle: () => cy.get('#custom_weather_products'),
            getPlaceOrderHistoryBulk: () => cy.get('div.button-container a[href="/history_bulks/new"]'),
            getHistoricalDataArchivesDocumentationLink: () => cy.get('a[href*="history-data-state"]'),
            getHistoryForecastBulk: () => cy.get('.product a[href*="forecast"]:not(.button-round)'),
            getHistoricalWeatherData: () => cy.get('.product a[href="/zip_code_data/new"]:not(.button-round)'),
            getHistoryBulkLink: () => cy.get('div.product a[href="/history_bulks/new"]:not(.button-round)')
      }

      clickDocumentationBtnHistoryBulk () {
            this.elements.getDocumentationBtnHistoryBulk().invoke('removeAttr', 'target').click()
      }

      clickPlaceOrderHistoryBulk () {
            this.elements.getPlaceOrderHistoryBulk().invoke('removeAttr', 'target').click()
      }

      clickHistoricalDataArchivesDocumentationLink () {
            this.elements.getHistoricalDataArchivesDocumentationLink().invoke('removeAttr', 'target').click();
      };

      clickHistoryForecastBulk () { 
            this.elements.getHistoryForecastBulk().click();
      }

      clickHistoricalWeatherData () {
            this.elements.getHistoricalWeatherData().click();
      }

      clickHistoryBulkLink() {
            this.elements.getHistoryBulkLink().click();
      };
};
export default MarketplacePage
