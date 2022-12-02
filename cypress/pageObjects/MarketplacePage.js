class MarketplacePage {
      elements = {
            getH1CustomWeatherProducts: () => cy.get('div #custom_weather_products h1'),
            getAllProductTitles: () => cy.get('.market-place a[href]:not(.button-round)'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getAllProductTitles: () => cy.get('.market-place .product h5 a'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href="https://openweathermap.org/history-bulk"]'),
            getMarketplacePageTitle: () => cy.get('#custom_weather_products'),
            getDocumentationBtnHistoricalByDataState: () => cy.get('.button-container [href*="history-data-state"]'),
            getPlaceOrderHistoryBulk: () => cy.get('div.button-container a[href="/history_bulks/new"]')
      }

clickDocumentationBtnHistoryBulk () {
            this.elements.getDocumentationBtnHistoryBulk().invoke('removeAttr', 'target').click()
       }

clickDocumentationBtnHistoricalByDataState () {
      this.elements.getDocumentationBtnHistoricalByDataState().invoke('removeAttr', 'target').click()
}
clickPlaceOrderHistoryBulk () {
            this.elements.getPlaceOrderHistoryBulk().invoke('removeAttr', 'target').click()
}   

}
export default MarketplacePage
