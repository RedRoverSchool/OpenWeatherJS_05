/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";

const guidePage = new GuidePage();
const header = new Header();


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
        cy.visit('/');
    });
});

        it('AT_008.011 | Main menu > Guide > verify button "Home"', function () {
            header.clickGuideMenuLink();
            cy.url().should('be.equal', this.url.guidePage);

            guidePage.clickHomeMenuLink();
            cy.url().should('be.equal', this.url.mainPageLink);
        });
})
