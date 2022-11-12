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

    it('AT_002.002 | Pricing > Verifying the website"s logo is clickable and redirects User to the Main page', () => {

        const pricing = '#desktop-menu a[href="/price"]'
        cy.visit('https://openweathermap.org/')
        cy.get(pricing).click()
        cy.url().should('eq', 'https://openweathermap.org/price')
        cy.get('.logo > a').click()
        cy.url().should('eq', 'https://openweathermap.org/')

    });

    it('AT_009.001 | Main menu > After clicking Marketplace User is redirected to the Marketplace page', () => {
        const marketplace = '#desktop-menu a[href*="marketplace"]'

        cy.visit('https://openweathermap.org/')
        cy.get(marketplace).invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://home.openweathermap.org/marketplace')
    });
    
});