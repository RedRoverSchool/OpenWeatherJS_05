/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import FAQPage from "../pageObjects/FAQPage.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";

const guidePage = new GuidePage();
const header = new Header();
const faqPage = new FAQPage();
const howToStart = new HowToStartPage();

describe('Header test suit', () => {

    beforeEach(function () {
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.fixture('guidePage').then(text => {
            this.text = text
        });
        cy.fixture('faqPage').then(faqData => {
            this.faqData = faqData;
        });
        cy.fixture('howToStartPage').then(pageText => {
            this.pageText = pageText
        });
        cy.visit('/');
    });

    it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', function () {
        header.clickGuideMenuLink();
        cy.url().should('be.equal', this.url.guidePage);
    
        guidePage.elements.getPageDescription().should('have.text', this.text.pageDescriptionText).and('be.visible')
    })

    it('AT_016.001 | Support > FAQ page > Verify Support button and FAQ link is clickable and redirects to the FAQ page', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        cy.url().should('eq', this.url.FAQPage);
        faqPage.elements.getTitle().should('have.text', this.faqData.h1Title);
    });

    it('AT_008.007 | Main menu > Guide > Verify user will be redirected to new url "/guide"', function () {
        header.clickGuideMenuLink();
        
        cy.url().should('be.equal', this.url.guidePage);
        guidePage.elements.getTitleGuide().should('have.text', this.text.h1Title);
      });

    it('AT_018.002 | Support > Dropdown menu > Verify "How to start" menu link', function() {
        header.clickSupportDropDownMenu();
        header.clickSupportHowToStartLink();

        cy.url().should('eq', this.url.howToStartPage);
        howToStart.elements.getTitle().should('have.text', this.pageText.headerTitle);
    });
})