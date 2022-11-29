
class MainPage {

    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button'),
        getPageDescriptionWhiteText: () => cy.get('span.white-text'),
        getApiLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getHomePageButton: () => cy.get('.breadcrumb a[href="/"]'),
        getMainPageContent: () => cy.get('h1 span.orange-text'),
        getForecastDays: () => cy.get('.day-list li'),
        getForecastFirstDay: () => cy.get('.day-list li:first-child > span'),
        getSearchResultsDropdown: () => cy.get('ul.search-dropdown-menu li'),
        getCopyrightMapLink: () => cy.get('a[href*="copyright"]'),
        getOurNewProductSubHeaderTitle: () => cy.get('.no-mobile-padding h2 span'),
        getSolarRadiationLink: () => cy.get('a[href="/api/solar-radiation'),
        getToggleTempretureDefault: () => cy.get('.switch-container :nth-child(3)'),
        getToggleTempreture: () => cy.get('.switch-container :nth-of-type(2)')
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
    
    clickCopyrightMapLink () {
        this.elements.getCopyrightMapLink().invoke('removeAttr', 'target').click({force: true});
    }

    clickSolarRadiationLink() {
        this.elements.getSolarRadiationLink().click({force: true});
    }

    clickTempretureToggle() {
        this.elements.getTempreture()
            .click({ force: true });
    }
}

export default MainPage;