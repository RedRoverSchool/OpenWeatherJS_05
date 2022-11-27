/// <reference types="cypress" />

import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";

const guidePage = new GuidePage();
const header = new Header();

describe('Guide page test suite', () => {
    beforeEach(function () {
        cy.fixture('asiaJS').then(data => {
            this.data = data
        });
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.visit('/');
    });

    it('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"', function () {
        header.elements.getGuideMenuLink().should('contain.text', this.data.menuLink.guide.text);
        header.clickGuideMenuLink(); 

        cy.url().should('include', this.data.menuLink.guide.endPoint);
        guidePage.elements.getTitleGuide().should('be.visible');
    });

    it('AT_008.007 | Main menu > Guide > Verify user will be redirected to new url "/guide"', function () {
        header.clickGuideMenuLink();
        cy.url().should('be.equal', this.url.guidePage);
        guidePage.elements.getTitleGuide().should('have.text', this.data.menuLink.guide.text)
      })

    it('AT_008.011 | Main menu > Guide > verify button "Home"', function () {
        header.clickGuideMenuLink();
        cy.url().should('be.equal', this.url.guidePage);

        guidePage.clickHomeMenuLink();
        cy.url().should('be.equal', this.url.mainPageLink);
    });
});