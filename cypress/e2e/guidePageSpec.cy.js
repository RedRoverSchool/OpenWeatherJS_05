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
        cy.visit('/');
    });

    it('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"', function () {
        header.elements.getGuideMenuLink().should('contain.text', this.data.menuLink.guide.text);
        header.clickGuideMenuLink();

        cy.url().should('include', this.data.menuLink.guide.endPoint);
        guidePage.elements.getTitleGuide().should('be.visible');
    });

});


