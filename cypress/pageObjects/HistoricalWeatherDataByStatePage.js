class HistoricalWeatherDataByStatePage {

    elements = {
        getFullListOfStates: () => cy.get('.material-table td:first-child'),
        getFullListOfPrices: () =>cy.get('.material-table td:last-child'),
        getTitlePage: () => cy.get('.breadcrumb-title'),
        getFullListOfZIPcodes: () => cy.get('.material-table td:nth-child(2)'),
        getDataState: () => cy.get('.material-table tr:not(tr:first-child)'),
        getDataStateTable: () => cy.get('.material-table')
    };
};
export default HistoricalWeatherDataByStatePage