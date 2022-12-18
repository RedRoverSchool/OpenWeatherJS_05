
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
        getToggleTempretureDefault: () => cy.get('.switch-container :nth-child(3)'), // imperial
        getToggleTempreture: () => cy.get('.switch-container :nth-of-type(2)'), // Metric
        getCurrentDate: () => cy.get('.current-container .orange-text'),
        getDailyDetailContainerWeather: () => cy.get('.daily-detail-container'),
        getIconToDetailedWeather: () => cy.get('[fill="#48484A"]'),
        getTimeOfDayInDetailedWeather: () => this.elements.getDailyDetailContainerWeather().find('tr').eq(0).find('th'),
        getCityNameSubHeaderTitle: () => cy.get('div.current-container h2'),
        getWeatherIcon: () => cy.get('div.current-temp .owm-weather-icon'),
        getToggleMetric: () => cy.get('#selected[style="left: 2pt;"]'),
        getTemperatureHeading: () => cy.get('div.current-temp .heading'),
        getFullConvertToDegreesCelsius: () => cy.get('#selected').filter(':not(".slideLeft")'),
        getFullConvertToDegreesFahrenheit: () => cy.get('#selected').filter(':not(".slideRight")'),
        getSearchNotFoundMessage: () => cy.get('.sub.not-found'),
        getSearchNotFoundWidgetNotification: () => cy.get('div.widget-notification'),
        getDifferentWeatherMenu: () => cy.get('#weather-widget span.owm-switch'),
        getDifferentWeatherPopup: () => cy.get('div.pop-up-container'),
        getDifferentWeatherIcons: () => cy.get('ul.icons span'),
        getDifferentWeatherMoreOptionsBtn: () => cy.get('div.more-options'),
        getDifferentWeatherWindStrongBtn: () => cy.get('#strong'),
        getDiffWeathDataSourseDropdown: () => cy.get('.dropdown-selector svg.icon-down'),
        getDifferentWeatherDataSourseItem: () => cy.get('div.menu-item span'),
        getDifferentWeatherTemperatureField: () => cy.get('[type="number"]'),
        getDifferentWeatherEmail: () => cy.get('input[type="email"]'),
        getDifferentWeatherAddInfo: () => cy.get('.owm_textarea'),
        getDifferentWeatherSendBtn: () => cy.get('.pop-up-footer .button-round'),
    }

    clickSearchBtn() {
        this.elements.getSearchBtn().click({ force: true });
    }

    setSearchInputText(inputText) {
        this.elements
            .getSearchInput()
            .clear({ force: true })
            .type(inputText, { force: true });
    }

    clickApiLink() {
        this.elements.getApiLink().click({ force: true });
    }

    clickCopyrightMapLink() {
        this.elements.getCopyrightMapLink().invoke('removeAttr', 'target').click({ force: true });
    }

    clickSolarRadiationLink() {
        this.elements.getSolarRadiationLink().click({ force: true });
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

    clickDifferentWeatherMenu() {
        this.elements.getDifferentWeatherMenu().click();
    }

    clickToggleTempretureDefault() {
        this.elements.getToggleTempretureDefault().click()
    }

    clickToggleTempreture() {
        this.elements.getToggleTempreture().click()
    }

    clickDifferentWeatherIcon (iconText) {
        this.elements.getDifferentWeatherIcons().contains(iconText).click()
    }

    clickDifferentWeatherMoreOptionsBtn() {
        this.elements.getDifferentWeatherMoreOptionsBtn().click()
    }

    checkDifferentWeatherWindStrong() {
        this.elements.getDifferentWeatherWindStrongBtn().check({force: true})
    }

    selectItemDiffWeathDataSourseDropdown(itemText) {
        this.elements.getDiffWeathDataSourseDropdown().click()
        this.elements.getDifferentWeatherDataSourseItem().contains(itemText).click()
    }

    clickDifferentWeatherSendBtn() {
        this.elements.getDifferentWeatherSendBtn().click()
    }

    fillDifferentWeatherTemperatureField(temperature) {
        this.elements.getDifferentWeatherTemperatureField().clear().type(temperature)
    }

    fillDifferentWeatherEmail(email) {
        this.elements.getDifferentWeatherEmail().type(email)
    }

    fillDifferentWeatherAddInfo(additionalInfo) {
        this.elements.getDifferentWeatherAddInfo().type(additionalInfo)
    }
}

export default MainPage;