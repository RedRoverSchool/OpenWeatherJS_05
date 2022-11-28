/// <reference types="cypress" />
 
import Footer from "../pageObjects/Footer.js"

const footer = new Footer();
 
describe('Footer test suite', () => {

    beforeEach(function() {
        cy.fixture('footer').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.visit('/');
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        footer.clickWebsiteTermsAndConditionsLink();
        
        cy.url().should('be.equal',this.data.websiteTermsUrl);
    });

    it('AT_029.001 | Footer >Download OpenWeather App> Verify two icons are visible', function() {
        footer.elements.getAppStoreLink().should('be.visible')
        footer.elements.getGooglePlayLink().should('be.visible')
    })

    it('AT_050.002 | Footer > Verify that user can be redirected to the "Terms and conditions of sale" page', function () {
        footer.clickOnTermsAndConditionsOfSaleLink();
        
        cy.url().should('eq',this.data.termsAndConditionsOfSaleUrl);
    });

    it("AT_029.002 | Footer >Download OpenWeather App> Download on the App Store' button link", function() {
        footer.clickAppStoreLink()
        cy.url().should('eq', this.data.DownloadAppURL.AppStoreURL);        
    });

    it("AT_029.003 | Footer >Download OpenWeather App> Download on the Google play' button link", function() {
        footer.clickGooglePlayLink();
        cy.url().should('eq', this.data.DownloadAppURL.GooglePlayURL);
    });
    
    it('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', function() {  
        footer.clickWebsiteTermsAndConditionsLink();

        cy.url().should('eq', this.url.WebsiteTermsAndConditions);
    });

    it('AT_022.004 | Footer > Check Medium icon is clickable', function () {
        footer.elements.getMediumIcon().should('be.visible')
        footer.clickMediumIcon()

        cy.url().should('eq', this.url.mediumUrl)
        footer.elements.getNameOfPageMedium().should('have.text', this.data.mainPageText).and('be.visible')
            
    });

    it('AT_030.002 | Footer > Verify redirection to terms and conditions', function () {
        footer.clickWebsiteTermsAndConditionsLink()
    
        cy.url().should('include', this.data.websiteTermsUrl)
    })
});
