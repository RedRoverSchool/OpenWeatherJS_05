class HistoryBulksNewPage {
    elements = {
        getHistoryBulksNewTitle:() => cy.get('h4.heading'),
        getHistoryBulkTitle:() => cy.get('.breadcrumb-title'),
        getAllStateNames: () => cy.get('table.material-table tr td:nth-child(1)'),
    }
}
export default HistoryBulksNewPage;