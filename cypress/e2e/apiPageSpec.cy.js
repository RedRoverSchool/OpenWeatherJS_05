/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import ApiPage from "../pageObjects/ApiPage.js"

const header = new Header();
const apiPage = new ApiPage()

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
});
