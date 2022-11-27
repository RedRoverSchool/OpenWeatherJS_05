
class MainPage {

    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button'),
        getPageDescriptionWhiteText: () => cy.get('span.white-text'),
        getApiLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getHomePageButton: () => cy.get('.breadcrumb a[href="/"]'),
        getMainPageContent: () => cy.get('h1 span.orange-text'),
        getForecastDays: () => cy.get('.day-list li'),
        getOurNewProductTitle: () => cy.get('.no-mobile-padding h2 span.orange-text'),
        getOurNewProductTitleWordNew: () => cy.get ('.no-mobile-padding h2 span'),
        getSolarRadiationLink: () => cy.get('a[href="/api/solar-radiation"]'),
        getSolarRadiationPageTitle: () => cy.get ('.breadcrumb-title')
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

    clickOurNewProductTitle() {
        this.elements.getOurNewProductTitle().click({force: true});
    }

    clickSolarRadiationLink() {
        this.elements.getSolarRadiationLink().click({force: true});
    }
    checkOurNewProductPageIsOpen() {
        this.elements.getSolarRadiationPageTitle().should('have.text', "Solar Radiation API")
    }
}
export default MainPage;