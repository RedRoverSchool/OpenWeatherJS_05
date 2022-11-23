/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import Footer from "../pageObjects/Footer.js"
 
const header = new Header();
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
});