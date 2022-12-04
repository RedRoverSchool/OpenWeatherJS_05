/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import TopicPage from "../pageObjects/TopicPage.js";

const guidePage = new GuidePage();
const header = new Header();
const topicPage = new TopicPage();


describe('Topic Page test suite', () => {
    beforeEach(function () {
        cy.fixture('header').then(supportList => {
            this.supportList = supportList;
        })
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('guidePage').then(text => {
            this.text = text;
        });    
        cy.fixture('topicPage').then(topic => {
           this.topic = topic;
        });
        cy.visit('/');
  
});

        it('AT_008.011 | Main menu > Guide > verify button "Home"', function () {
            header.clickGuideMenuLink();
            cy.url().should('be.equal', this.url.guidePage);

            guidePage.clickHomeMenuLink();
            cy.url().should('be.equal', this.url.mainPageLink);
        });

        it('AT_008.012 | Main menu > Guide > headline check', function () {
            header.clickGuideMenuLink();
            cy.url().should('be.equal', this.url.guidePage);

            topicPage.elements.getHeadlineGuide().should('contain', this.topic.headlineGuide);
        });
})
