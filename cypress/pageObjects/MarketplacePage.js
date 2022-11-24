class MarketplacePage {
      elements = {
            getH1CustomWeatherProducts: () => cy.get('div #custom_weather_products h1'),
            getAllProductTitles: () => cy.get('.market-place a[href]:not(.button-round)')
      }
}
export default MarketplacePage
