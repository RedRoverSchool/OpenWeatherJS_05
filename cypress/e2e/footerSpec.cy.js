/// <reference types="cypress" />

import Footer from "../pageObjects/Footer.js"

const footer = new Footer();

describe('Footer test suite', () => {

    beforeEach(function () {
        cy.fixture('footer').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('faqPage').then(faqPage => {
            this.faqPage = faqPage;
        })
        cy.visit('/');
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        footer.clickWebsiteTermsAndConditionsLink();

        cy.url().should('be.equal', this.data.websiteTermsUrl);
    });

    it('AT_029.001 | Footer >Download OpenWeather App> Verify two icons are visible', function () {
        footer.elements.getAppStoreLink().should('be.visible')
        footer.elements.getGooglePlayLink().should('be.visible')
    })

    it('AT_050.002 | Footer > Verify that user can be redirected to the "Terms and conditions of sale" page', function () {
        footer.clickOnTermsAndConditionsOfSaleLink();

        cy.url().should('eq', this.data.termsAndConditionsOfSaleUrl);
    });

    it("AT_029.002 | Footer >Download OpenWeather App> Download on the App Store' button link", function () {
        footer.clickAppStoreLink()
        cy.url().should('eq', this.data.DownloadAppURL.AppStoreURL);
    });

    it("AT_029.003 | Footer >Download OpenWeather App> Download on the Google play' button link", function () {
        footer.clickGooglePlayLink();
        cy.url().should('eq', this.data.DownloadAppURL.GooglePlayURL);
    });

    it('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', function () {
        footer.clickWebsiteTermsAndConditionsLink();

        cy.url().should('eq', this.url.WebsiteTermsAndConditions);
    });

    it('AT_022.004 | Footer > Check Medium icon is clickable', function () {
        footer.elements.getMediumIcon().should('be.visible')
        footer.clickMediumIcon()

        cy.url().should('eq', this.url.mediumUrl)
    });

    it('AT_030.002 | Footer > Verify redirection to terms and conditions', function () {
        footer.clickWebsiteTermsAndConditionsLink()

        cy.url().should('include', this.data.websiteTermsUrl)
    })

    it('AT_022.001 | Footer > Verification of displayed six Social Media icons', function () {
        footer.elements.getSocialMediaIconLinks().should('have.length', 6).and('be.visible');
    });

    it('AT_022.002 | Footer > Ensure Facebook icon redirection', function () {
        footer.elements.getFacebookLink().should('be.visible');
        footer.clickFacebookLink();

        cy.url().should('include', this.url.facebookUrl);
        cy.title().should('eq', this.data.facebookTitleText);
    });

    it('AT_022.003 | Footer > Verify Tweeter icon redirection', function () {
        footer.elements.getTwitterLink().should('be.visible');
        footer.clickTwitterLink();

        cy.url().should('be.equal', this.url.twitterUrl);
        cy.title().should('include', this.data.twitterTitleText);
    });

    it('AT_050.003 | Footer > The User is redirected to Terms and conditions of sale page', function () {
        footer.clickOnTermsAndConditionsOfSaleLink();

        cy.url().should('eq', this.data.termsAndConditionsOfSaleUrl);
    });

    it("AT_022.008 | Footer > Social media > Verify Github icon redirection", function () {
        footer.elements.getGithubLink().should('be.visible');
        footer.clickGithubLink();

       cy.url().should('eq', this.url.githubUrl);
       cy.title().should('include', this.data.githubTitleText);
    });

    it('AT_023.001 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', function () {
        footer.clickFAQLink();
        cy.url().should('eq', this.url.FAQPage);
        cy.contains(this.faqPage.h1Title);
    });

    it('AT_023.002 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', function () {
        footer.elements.getFAQLink().should('be.visible');
        footer.clickFAQLink();

        cy.url().should('eq', this.url.FAQPage);
        cy.title().should('include', this.faqPage.h1Title)
    });

    it('AT_022.005 | Footer > Social media > 6 social media icons on the footer', function () {
        footer.elements.getSocialMediaIconLinks().each(($el, index) => {
        expect($el.attr('href')).to.include(this.data.socialIcons[index])
        });
    });

    it('AT_044.003 | Footer > PopUps > Manage cookies', function () {
        footer.elements.getAllowAllCookiesBtn().should('be.visible');
        footer.clickAllowAllCookiesBtn();
        
        footer.elements.getCookiesMessageField().should('not.be.visible');
    });

    it('AT_022.006 | Footer > Social media> Check LinkedIn icon is clickable', function () {
        footer.elements.getLinkedIn().should('be.visible');
        footer.clickLinkedInk();
  
        cy.url().should('eq', this.url.linkedinUrl);
        cy.title().should('include', 'LinkedIn Login');
    });
 
});
            
