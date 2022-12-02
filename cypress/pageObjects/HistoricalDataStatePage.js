class HistoricalDataState {
    elements = {
        getAllStateNames: () => cy.get('table.material-table tr td:nth-child(1)')
    }
}

export default HistoricalDataState;