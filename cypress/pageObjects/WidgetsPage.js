class WidgetsPage {
    elements = {
        getWidgets: () => cy.get('[id*="container-openweathermap-widget"]'),
        getPageTitle: () => cy.get('.breadcrumb-title'),
        getApiKeyInputField: () => cy.get('#api-key'),
        getCodeWidgetFirstBtn: () => cy.get('#widget-1-left-brown'),
        getPopupWindowTitle: () => cy.get('#popup-title')
    }

    clickCodeWidgetFirstBtn() {
        this.elements.getCodeWidgetFirstBtn().click();
    };    
}

export default WidgetsPage;