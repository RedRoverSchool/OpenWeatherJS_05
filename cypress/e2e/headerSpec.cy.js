/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import FAQPage from "../pageObjects/FAQPage.js";

const guidePage = new GuidePage();
const header = new Header();
const faqPage = new FAQPage();

describe('Header test suit', () => {

    beforeEach(function () {
        cy.fixture('url').then(url => {
            this.url = url;
        });
        
        cy.fixture('guidePage').then(text => {
            this.text = text;
        });
        
        cy.fixture('faqPage').then(faqData => {
            this.faqData = faqData;
        });

        cy.fixture('header').then(supportList => {
            this.supportList = supportList;
        })

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
  
    it('AT_018.009 | Header > Support > Verify Drop Down menu', function () {
        header.elements.getSupportDropDownMenuList().should('not.be.visible');
        header.clickSupportDropDownMenu();

        header.elements.getSupportDropDownMenuList().should('be.visible')
              .and('have.length', 3);        
        header.elements.getSupportDropDownMenuList().each(($el, idx) => {
            expect($el.text()).to.be.equal(this.supportList.supportDropdownList[idx]);
        });    
    });
})