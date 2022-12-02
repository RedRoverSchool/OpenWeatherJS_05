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
        getClosePopupWin: () => cy.get('#popup-close'),
        getApiInputFieldErrMessage: () => cy.get('#error-key'),
        getMoreOptionsDropdown: () => cy.get('#dialogDesc div.more-options'),
        getEmailFieldEnter: () => cy.get('#weather-widget  input[type="email"]')
    }

    clickCodeWidgetFirstBtn() {
        this.elements.getCodeWidgetFirstBtn().click();
    };    

    setApiKeyField(text) {
        this.elements.getApiKeyInputField().type(text)
    }

    clickClosePopupWin() {
        this.elements.getClosePopupWin().click()
    }

    pasteCopiedApiKeyInInputField(myApiKey) {
        cy.get(myApiKey).then($el => {
            this.elements.getApiKeyInputField().type($el);
          });
    }

    clickMoreOptionsDropdown() {
        this.elements.getMoreOptionsDropdown().click();
    }

    typeEmailInInputField(email) {
        this.elements.getEmailFieldEnter().type(email);
    }
}

export default WidgetsPage;