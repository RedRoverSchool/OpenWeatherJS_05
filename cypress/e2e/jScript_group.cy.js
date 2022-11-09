/// <reference types="cypress"/>

describe('Group jScript_group', () => {

    it('AT_013.001 | NavBar > After clicking the Blog menu User is redirected to the Blog page', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('be.equal', 'https://openweather.co.uk/blog/category/weather');
    });
});