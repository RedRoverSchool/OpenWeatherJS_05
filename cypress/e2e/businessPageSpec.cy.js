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
});

