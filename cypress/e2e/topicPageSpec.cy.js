/// <reference types="cypress" />


import BusinessPage from "../pageObjects/BusinessPage.js";
import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";

const guidePage = new GuidePage();
const header = new Header();
const businessPage = new BusinessPage;

describe('Topic Page test suite', () => {
    beforeEach(function () {
        cy.fixture('header').then(supportList => {
            this.supportList = supportList;
        })
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.fixture('guidePage').then(text => {
            this.text = text
        });
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
   });

        it('AT_008.011 | Main menu > Guide > verify button "Home"', function () {
            header.clickGuideMenuLink();
            cy.url().should('be.equal', this.url.guidePage);

            guidePage.clickHomeMenuLink();
            cy.url().should('be.equal', this.url.mainPageLink);
        });

        it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
            header.clickBusinessMenuLink()
    
            cy.url().should('eq', this.url.openWetherForBusiness)
            businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
        });

        it('AT_008.007 | Main menu > Guide > Verify user will be redirected to new url "/guide"', function () {
            header.clickGuideMenuLink();
            
            cy.url().should('be.equal', this.url.guidePage);
            guidePage.elements.getTitleGuide().should('have.text', this.text.h1Title);
        });
})
