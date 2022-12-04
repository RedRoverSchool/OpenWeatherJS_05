class HistoricalWeatherDataByStatePage {
    elements = {
        getFullListOfStates: () => cy.get('.material-table td:first-child'),
        getFullListOfPrices: () =>cy.get('.material-table td:last-child'),
    };
};
export default HistoricalWeatherDataByStatePage