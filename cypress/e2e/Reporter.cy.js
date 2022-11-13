/// <reference types="cypress"/> 
const inputSearchCity = 'input[placeholder = "Search city"]';


describe('GroupReporters', () => {

    beforeEach(function () {
        cy.visit('https://openweathermap.org/')
    });

    function enterCityOrZipCode(inputText) {
        cy.get(inputSearchCity)
            .clear()
            .type(inputText);
        return this
    };

    function submit() {
        cy.get('.search-block button').click()
    };

    it('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        const inputCity = "$$$";

        enterCityOrZipCode(inputCity);
        submit();
        cy.get('.sub.not-found')
            .should('be.visible')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).");
        cy.get('div.widget-notification')
            .should('be.visible')
            .should('have.text', `No results for ${inputCity}`);
    })

    it('AT_005.001 | Verify the website name and description', () => {
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather')
        cy.get('h2 .white-text')
            .should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way')
    })

    it('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
        const zipCode = '60604';

        enterCityOrZipCode(zipCode);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', zipCode);
    });

    it('AT_034.001 | <Header > verify "For Business" button', () => {
        cy.get('#desktop-menu :nth-child(10) > a').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://openweather.co.uk/')
    });

    it('AT_001.008 | Main page > Section with search > Verify entered a City name into the Search city field', () => {
        const cityName = 'Washington DC';

        enterCityOrZipCode(cityName);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', cityName);
    });
});
