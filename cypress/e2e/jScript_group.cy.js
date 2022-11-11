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

    it('AT_013.002 | NavBar > After redirecting to the Blog page 10 posts are displayed on the first page', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.get('.post-list .post').should('have.length', 10);
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('[href*="use.pdf"]').invoke('removeAttr', 'target').click();
        cy.url().should('include','terms_and_conditions_of_use.pdf')
    });

    it('AT_017.002 | Support > "How to start" > Verify "How to start" link redirection', () => {
        cy.visit('https://openweathermap.org/')
        cy.get('#support-dropdown').click({force: true})
        cy.get('.dropdown-menu [href*="/appid"]').click({force: true})
        cy.url().should('eq', 'https://openweathermap.org/appid') 
     })
});