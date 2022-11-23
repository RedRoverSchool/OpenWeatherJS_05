/// <reference types="cypress" />
 
import Footer from "../pageObjects/Footer.js"
 
const footer = new Footer();
 
describe('Footer test suite', () => {

    beforeEach(function() {
        cy.fixture('footer').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        footer.elements.getWebsiteTermsAndConditions().invoke('removeAttr', 'target').click();
        
        cy.url().should('be.equal',this.data.websiteTermsUrl);
    });

    it('AT_029.001 | Footer >Download OpenWeather App> Verify two icons are visible', function() {
        footer.elements.getAppStoreLink().should('be.visible')
        footer.elements.getGooglePlayLink().should('be.visible')
    })
});
