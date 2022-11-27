class MarketplacePage {
      elements = {
            getH1CustomWeatherProducts: () => cy.get('div #custom_weather_products h1'),
            getAllProductTitles: () => cy.get('.market-place a[href]:not(.button-round)'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getAllProductTitles: () => cy.get('.market-place .product h5 a'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getMarketplacePageTitle: () => cy.get('#custom_weather_products')
      }

clickDocumentationBtnHistoryBulk () {
            this.elements.getDocumentationBtnHistoryBulk().invoke('removeAttr', 'target').click()
       }
}
export default MarketplacePage
