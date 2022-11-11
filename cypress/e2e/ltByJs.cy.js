/// <reference types="cypress"/>

describe('Group lt_by_js', () => {
    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu item', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href$=-dashboard]').click();
        cy.url().should('include', '/weather-dashboard');
    });
});