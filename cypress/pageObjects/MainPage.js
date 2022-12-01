
class MainPage {

    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button'),
        getPageDescriptionWhiteText: () => cy.get('h2 .white-text'),
        getApiLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getMainPageContent: () => cy.get('h1 .orange-text'),
        getForecastDays: () => cy.get('.day-list li'),
        getForecastFirstDay: () => cy.get('.day-list li:first-child > span'),
        getSearchResultsDropdown: () => cy.get('ul.search-dropdown-menu li'),
        getSearchResultFromDropdown: () => cy.get('ul.search-dropdown-menu li:nth-child(1)'),
        getCopyrightMapLink: () => cy.get('a[href*="copyright"]'),
        getOurNewProductSubHeaderTitle: () => cy.get('.no-mobile-padding h2 span'),
        getSolarRadiationLink: () => cy.get('a[href="/api/solar-radiation'),
        getToggleTempretureDefault: () => cy.get('.switch-container :nth-child(3)'),
        getToggleTempreture: () => cy.get('.switch-container :nth-of-type(2)'),
        getCurrentDate: () => cy.get('.current-container .orange-text'),
        getDailyDetailContainerWeather: () => cy.get('.daily-detail-container'),
        getIconToDetailedWeather: () => cy.get('[fill="#48484A"]'),
        getTimeOfDayInDetailedWeather: () => this.elements.getDailyDetailContainerWeather().find('tr').eq(0).find('th'),
        getCityNameSubHeaderTitle: () => cy.get('div.current-container h2')
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

    assertDropdownContains(name) {
        this.elements.getSearchResultsDropdown()
        .should('be.visible')
        .each($el => {
            cy.wrap($el).should('contain', name)
        })
    }

    clickSearchResultFromDropdown() {
        this.elements.getSearchResultFromDropdown().click();
    }

}

export default MainPage;