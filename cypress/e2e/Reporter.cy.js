/// <reference types="cypress"/> 


describe('GroupReporters', () => {

    const inputSearchCity = 'input[placeholder = "Search city"]';
    const differentWeatherBtn = '.controls span.owm-switch';
    const differentWeatherPopup = 'div.pop-up-container';
    const differentWeatherIcon = 'ul.icons span'; // should be used with method .contains('icon text')
    const diffWeathMoreOptions = 'div.more-options';
    const diffWeathTemperatureField = '[type="number"]';
    const diffWeathWindStrong = '#strong';
    const diffWeathEmail = 'input[type="email"]';
    const diffWeathDataSourseDropArr = '.dropdown-selector svg.icon-down';
    const diffWeathDataSourseDropItem = 'div.menu-item span'; // should be used with method .contains('item text')
    const diffWeathAddInfo = '.owm_textarea';
    const diffWeathSendBtn = '.pop-up-footer .button-round';
   
    beforeEach(function () {
        cy.visit('https://openweathermap.org/')
    });

    function enterCityOrZipCode(city) {
        cy.get(inputSearchCity)
            .clear()
            .type(city);
        return this
    };

    function submit() {
        cy.get('.search-block button').click()
    };

    xit('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        const inputCity = "$$$"

        cy.get('input[placeholder = "Search city"]').type(inputCity, { force: true })
        cy.get('.search-block button').click()
        cy.get('.sub.not-found')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).")
        cy.get('div.widget-notification').should('have.text', `No results for ${inputCity}`)
    })

   xit('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
        const zipCode = '60604';

        enterCityOrZipCode(zipCode);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', zipCode);
    });

    it('AT_024.002 | After clicking on "send" button, the form window automatically disappears', () => {
       
        cy.get(differentWeatherBtn).click()
        cy.get(differentWeatherPopup).should('be.be.visible')
        cy.get(differentWeatherIcon).contains('clear sky')
        cy.get(diffWeathMoreOptions).click()
        cy.get(diffWeathTemperatureField).clear({force: true}).type('50')
        cy.get(diffWeathWindStrong).click({force: true})
        cy.get(diffWeathEmail).type('test@mail.com')
        cy.get(diffWeathDataSourseDropArr).click()
        cy.get(diffWeathDataSourseDropItem).contains('Personal feelings').click()
        cy.get(diffWeathAddInfo).type('Not nice to lie about weather!')
        cy.get(diffWeathSendBtn).click()
        cy.get(differentWeatherPopup).should('not.exist')
    })
});
