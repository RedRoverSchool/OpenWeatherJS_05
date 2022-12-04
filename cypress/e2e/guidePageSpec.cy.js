/// <reference types="cypress" />

import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import PricingPage from "../pageObjects/PricingPage.js";
import ApiPage from "../pageObjects/ApiPage.js";


const guidePage = new GuidePage();
const header = new Header();
const pricingPage = new PricingPage();
const apiPage = new ApiPage();

describe('Guide page test suite', () => {
    beforeEach(function () {
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.fixture('guidePage').then(text => {
            this.text = text
        })
        cy.fixture('pricingPage').then(pricingPage => {
            this.pricing = pricingPage
        });
        cy.fixture('apiPage').then(apiPage => {
            this.apiPage = apiPage
        });
        cy.visit('/');
    });

    it('AT_008.008 | Main menu > Guide > Verify the user is redirected to new url', function () {
        header.clickGuideMenuLink();

        cy.url().should('be.equal', this.url.guidePage);
        guidePage.elements.getPageDescription().should('have.text', this.text.pageDescriptionText);
    })

    it('AT_008.004 | Main menu > Guide | Verify the button "Subscribe to One Call by Call" is clickable and user be redirected new url', function () {
        header.clickGuideMenuLink();
        guidePage.clickSubscribeButton();

        cy.url().should('be.equal', this.url.pricingPage);
        pricingPage.elements.getPricingTitle().should('have.text', this.pricing.pageDescriptionTitle);
    });

    it('AT_008.009 | Main menu > Guide > Verify text on the page', function () {
        header.clickGuideMenuLink();
        
        guidePage.elements.getPageDescription().should('have.text', this.text.pageDescriptionText);
        guidePage.elements.getOpenWeatherText().should('have.text', this.text.openWeatherText);
        guidePage.elements.getProfessionalCollectionsText().should('have.text', this.text.professionalCollectionsText);
        guidePage.elements.getDedicatedWeatherProductsText().should('have.text', this.text.dedicatedWatherProductsText);
        guidePage.elements.getOpenWeatherNwnText().should('have.text', this.text.openWeatherNwnText);
        guidePage.elements.getHowToStartText().should('have.text', this.text.howToStartText)
    })

    it('AT_008.002 | Main menu > Guide | Verify the first button "Learn more" is clickable and user will be redirected new url', function () {
        header.clickGuideMenuLink();
        guidePage.clickFirstLearnMoreButton();

        cy.url().should('be.equal', this.url.apiCurrent);
        apiPage.elements.getWeatherApiTitle().should('have.text', this.apiPage.h1Title);
    });

    it('AT_008.013 | Guide > Verify the second button "Learn more" is clickable and user will be redirected new url', function () {
        header.clickGuideMenuLink();
        guidePage.clickLearnMoreSecondButton();
        cy.url().should('be.equal', this.url.apiHistory);
        apiPage.elements.getWeatherApiTitle().should('have.text', this.apiPage.h1Title)
    });

    it('AT_008.001 | Guide > Verify URL and header is displayed on the page', function () {
        header.clickGuideMenuLink();
    
        cy.url().should('be.equal', this.url.guidePage);
        guidePage.elements.getPageDescription().should("have.text", this.text.pageDescriptionText);
    });

    it('AT_008.012 | Guide > Verify subheaders are displayed on the page', function () {
        header.clickGuideMenuLink();

        guidePage.elements.getSubHeaders2Level().each(($el, idx) => {
            expect($el.text()).to.include(this.text.headers2[idx])
        })

        guidePage.elements.getSubHeaders4Level().each(($el, idx) => {
            expect($el.text()).to.include(this.text.headers4[idx])
        })
    });

});