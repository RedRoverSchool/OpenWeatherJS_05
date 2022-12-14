/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import ApiPage from "../pageObjects/ApiPage.js"
import TopicPage from "../pageObjects/TopicPage.js"
import MainPage from "../pageObjects/MainPage.js"

const header = new Header();
const apiPage = new ApiPage();
const topicPage = new TopicPage();
const mainPage = new MainPage();

describe('Api page test suite', () => {

      beforeEach(function () {
            cy.fixture('apiPage').then(data => {
                  this.data = data;
            });
            cy.visit('/');
      });

      it('AT_033.003 | Header > Navigation> Verify "API" menu link', function () {
            header.clickApiMenuLink();
            
            cy.url().should('be.equal', this.data.url)
            apiPage.elements.getWeatherApiTitle().should('have.text', this.data.h1Title)
      });

      it.only('AT_051.002 | API > Testing Home button > Verify that after clicking on the Home link on the API page the user gets redirected to the Home page of the site.', function () {
            header.clickApiMenuLink()
           
            topicPage.clickHomePageButton()
    
            mainPage.elements.getMainPageContent()
                  .should('have.text', 'OpenWeather')
        });    
});
