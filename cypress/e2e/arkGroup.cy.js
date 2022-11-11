/// <reference types="cypress"/> 

describe('arkGroup', () => {
    it(`AT_002.002 | Header > Verifying the website's logo is clickable and it redirects a User to the Main page`, () => {
        cy.visit('https://openweathermap.org/guide');
        cy.get('li[class="logo"]').click();
        cy.url().should('eq', 'https://openweathermap.org/');

    })

    it(`AT_008005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, () => {

        cy.visit('https://openweathermap.org/');
        cy.get('a[href="/guide"]').contains('Guide').click();
        cy.url().should('eq', 'https://openweathermap.org/guide');
    })
})