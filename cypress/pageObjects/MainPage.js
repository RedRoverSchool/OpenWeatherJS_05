class MainPage {
    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button'),
        getPageDescriptionWhiteText: () => cy.get('span.white-text'),
        getApiLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getHomePageButton: () => cy.get('.breadcrumb a[href="/"]'),
        getMainPageContent: () => cy.get('h1 span.orange-text'),
        getForecastDays: () => cy.get('.day-list li'),
        getForBusinessButton: () => cy.get('#desktop-menu :nth-child(10) > a'),
    }

    clickSearchBtn() {
        this.elements.getSearchBtn().click({force: true});
    }

    setSearchInputText(inputText) {
        this.elements
            .getSearchInput()
            .clear({force: true})
            .type(inputText, {force: true});
    }

    clickApiLink() {
        this.elements.getApiLink().click({force: true});
    }

    clickHomePageButton() {
        this.elements.getHomePageButton().click({force: true});
    }

    clickForBusinessBtn() {
        this.elements.getForBusinessButton()
        .invoke(removeAttr, target)
        .click()
    }
    checkUrlForBusiness() {
        cy.url().should('eq', 'https://openweather.co.uk/')
    }
}
export default MainPage;