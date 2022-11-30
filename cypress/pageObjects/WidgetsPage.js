class WidgetsPage {
    elements = {
        getWidgets: () => cy.get('[id*="container-openweathermap-widget"]'),
        getPageTitle: () => cy.get('.breadcrumb-title'),
        getApiKeyInputField: () => cy.get('#api-key'),
        getCodeWidgetFirstBtn: () => cy.get('#widget-1-left-brown'),
        getPopupWindowTitle: () => cy.get('#popup-title'),
        getAllGetAcodeButtons: () => cy.get('button[id*=brown]'),
        getPopupWindow: () => cy.get('#popup'),
        getCopyInBufferButton: () => cy.get('#copy-js-code'),
        getClosePopupWin: () => cy.get('#popup-close')
    }

    clickCodeWidgetFirstBtn() {
        this.elements.getCodeWidgetFirstBtn().click();
    };    

    clickClosePopupWin() {
        this.elements.getClosePopupWin().click()
    }
}

export default WidgetsPage;