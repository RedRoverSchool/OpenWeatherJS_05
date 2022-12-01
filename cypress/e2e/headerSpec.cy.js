/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import FAQPage from "../pageObjects/FAQPage.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";
import BusinessPage from "../pageObjects/BusinessPage.js";
import MainPage from "../pageObjects/MainPage.js";

const guidePage = new GuidePage();
const header = new Header();
const faqPage = new FAQPage();
const howToStart = new HowToStartPage();
const businessPage = new BusinessPage();
const mainPage = new MainPage();

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
        cy.fixture('mapsPage').then(mapsData => {
            this.mapsData = mapsData
        });
        cy.fixture('howToStartPage').then(pageText => {
            this.pageText = pageText
        });
        cy.fixture('businessPage').then(data => {
            this.data = data;
        })

        cy.fixture('header').then(supportList => {
            this.supportList = supportList;
        })

        cy.fixture('mainPage').then(mainPageData => {
            this.mainPageData = mainPageData;
        })
        
        cy.visit('/');
    });

    it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', function () {
        header.clickGuideMenuLink();
        cy.url().should('be.equal', this.url.guidePage);
    
        guidePage.elements.getPageDescription().should('have.text', this.text.pageDescriptionText).and('be.visible')
    });

    it('AT_016.001 | Support > FAQ page > Verify Support button and FAQ link is clickable and redirects to the FAQ page', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        cy.url().should('eq', this.url.FAQPage);
        faqPage.elements.getTitle().should('have.text', this.faqData.h1Title);
    });

    it('AT_033.012 | Header > Navigation > Verify "Maps" menu link', function () {
        header.clickMapsMenuLink();
        cy.url().should('eq', this.url.mapsPageLink);
        cy.title().should('eq', this.mapsData.pageTitle);
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

    it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
        header.clickBusinessMenuLink()

        cy.url().should('eq', this.url.openWetherForBusiness)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
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

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page',function () {
        header.clickInitiativePage()
        header.clickLogoLink()
    
        cy.url().should('eq', this.url.mainPageLink)
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText)      
    });
    
    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', function () {
        header.clickPartnersMenuLink();

        header.clickLogoLink();

        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText);
    });
    
    it('AT_002.008 | Dashboard > Verifying the website"s logo is clickable and redirects User to the Main page', function () {
        header.clickDashboardMenu()
        header.clickLogoLink()

        cy.url().should('eq', this.url.mainPageLink)
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText)
    });
});
