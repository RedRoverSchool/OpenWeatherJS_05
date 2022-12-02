class HistoryDataStatePage {
	elements = {
		getHistoryDataStateTitle:() => cy.get('.breadcrumb-title'),
		getStateNameArray: () => cy.get('.material-table tbody td:first-child')
	}
}
export default HistoryDataStatePage;