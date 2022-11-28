class WidgetsPage {
    elements = {
        getWidgets: () => cy.get('[id*="container-openweathermap-widget"]'),
        getPageTitle: () => cy.get('.breadcrumb-title'),
        getApiKeyInputField: () => cy.get('#api-key'),
        getCodeWidget1Btn: () => cy.get('#widget-1-left-brown'),
        getPopupWindowTitle: () => cy.get('#popup-title')
    }

    clickCodeWidget1Btn() {
        this.elements.getCodeWidget1Btn().click();
    };    
}

export default WidgetsPage;