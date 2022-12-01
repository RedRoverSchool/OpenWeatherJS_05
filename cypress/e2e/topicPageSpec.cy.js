/// <reference types="cypress" />

import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import PricingPage from "../pageObjects/PricingPage.js";
import ApiPage from "../pageObjects/ApiPage.js";
import FAQPage from "../pageObjects/FAQPage.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";
import BusinessPage from "../pageObjects/BusinessPage.js";
import MainPage from "../pageObjects/MainPage.js";



const guidePage = new GuidePage();
const header = new Header();
const pricingPage = new PricingPage();
const apiPage = new ApiPage();
const faqPage = new FAQPage();
const howToStart = new HowToStartPage();
const businessPage = new BusinessPage();
const mainPage = new MainPage();

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