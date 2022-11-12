/// <reference types="cypress"/>

describe('Group lt_by_js', () => {
    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu item', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href$=-dashboard]').click();
        cy.url().should('include', '/weather-dashboard');
    });

    it('AT_033.002 | Header > Navigation > Verify "Guide" menu item', () => {
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu [href="/guide"]').click()
        cy.url().should('eq', 'https://openweathermap.org/guide')
    });

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page', function (){
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu a[href="/our-initiatives"]').click();
        cy.get('.logo').click()
        cy.url().should('eq', 'https://openweathermap.org/');
        
    });
    
});