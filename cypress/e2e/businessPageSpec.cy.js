/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import BusinessPage from "../pageObjects/BusinessPage.js";

const header = new Header();
const businessPage = new BusinessPage();

describe('businessPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    })
        
    it('AT_034.001 | <Header > verify "For Business" button', function () {
        header.clickBusinessMenuLink()
        cy.url().should('eq', this.data.url)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
    });

    it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
        header.clickBusinessMenuLink()

        cy.url().should('eq', this.data.url)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
    });
});

