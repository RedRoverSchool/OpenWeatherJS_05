class HistoricalWeatherDataByStatePage {
    elements = {
        getFullListOfStates: () => cy.get('.material-table td:first-child')
    };
};
export default HistoricalWeatherDataByStatePage