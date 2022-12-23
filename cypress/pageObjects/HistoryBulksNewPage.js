class HistoryBulksNewPage {
    elements = {
        getHistoryBulksNewTitle: () => cy.get('h4.heading'),
        getHistoryBulkTitle: () => cy.get('.breadcrumb-title'),
        getAllStateNames: () => cy.get('table.material-table tr td:nth-child(1)'),
        getSearchField: () => cy.get('#firstSearch'),
        getSearchPopUp: () => cy.get('div.search-pop-up'),
        getImportOnSearchPopUp: () => cy.get('div.search-pop-up button').contains('Import'),
        getImportCSVfileButton: () => cy.get('div.import-block button'),
        getHiddenInputFile: () => cy.get('#importCSV'),
        getLocationsName: () => cy.get('.material-table tbody tr td:nth-child(2)'),
        getMessageNoLocations: () => cy.get('.location-table table tbody tr td'),
    }


    clickOnSearchField() {
        this.elements.getSearchField().click();
    };

    waitForSearchPopUpAppear() {
        this.elements.getSearchPopUp().should('be.visible')
    }

    clickOnImportOnSearchPopUp() {
        this.elements.getImportOnSearchPopUp().click();
    };

    clickOnImportCSVfileButton() {
        this.elements.getImportCSVfileButton().click();
    };

    selectCSVFile() {
        this.elements.getHiddenInputFile().selectFile('cypress/fixtures/importCityLoc.csv', { force: true })
    };

}
export default HistoryBulksNewPage;