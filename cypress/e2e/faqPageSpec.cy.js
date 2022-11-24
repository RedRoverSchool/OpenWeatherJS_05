/// <reference types="cypress"/>

import FAQPage from "../pageObjects/FAQPage.js";
import Header from "../pageObjects/Header.js";


const header = new Header();
const faqPage = new FAQPage();

describe('faqPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('faqPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    })

    it('AT_016.001 | Support > FAQ page > Verify Support button and FAQ link is clickable and redirects to the FAQ page', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();
        faqPage.elements.getTitle().should('have.text', this.data.h1Title);
      });
});