/// <reference types="cypress"/>

describe('Group jScript_group', () => {

    it('AT_013.001 | NavBar > After clicking the Blog menu User is redirected to the Blog page', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('be.equal', 'https://openweather.co.uk/blog/category/weather');
    });

    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', () => {
        cy.visit('https://openweathermap.org/examples');
        cy.get('.logo').click();
        cy.url().should('eq', 'https://openweathermap.org/');
     });
});