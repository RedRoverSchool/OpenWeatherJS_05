/// <reference types="cypress"/>

describe('Group jScript_group', () => {

    it('AT_013.001 | NavBar > Blog', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/blog/category/weather');
        cy.get('.post-list .post').should('have.length', 10);

        cy.get('.post-list .post:nth-child(1) .post__title-link').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/road-new-thinking-transport-power');
        cy.go('back');

        cy.get('.post-list .post:nth-child(5) .post__title-link').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/dawn-new-climate');
        cy.go('back');

        cy.get('.post-list .post:nth-child(10) .post__title-link').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/openweather-sponsors-world-data-league');
        cy.go('back');
    });

    it('AT_002.001 | Header > Logo', () => {
        cy.visit('https://openweathermap.org/examples');
        cy.get('.logo').click();
        cy.url().should('eq', 'https://openweathermap.org/');
     });
});