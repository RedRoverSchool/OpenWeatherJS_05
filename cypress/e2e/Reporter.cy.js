/// <reference types="cypress"/> 


describe('GroupReporters', () => {

    const inputSearchCity = 'input[placeholder = "Search city"]';

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

    it.scip('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        const inputCity = "$$$"

        cy.get('input[placeholder = "Search city"]').type(inputCity, { force: true })
        cy.get('.search-block button').click()
        cy.get('.sub.not-found')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).")
        cy.get('div.widget-notification').should('have.text', `No results for ${inputCity}`)
        
    })

    it.scip('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
        const zipCode = '60604';

        enterCityOrZipCode(zipCode);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', zipCode);
    });

    it('AT_034.001 | <Header > verify "For Business" button', () => {
        cy.get(#desktop-menu :nth-child(10) > a).click()
        cy.url().should('https://openweather.co.uk/')
        
    });
});
