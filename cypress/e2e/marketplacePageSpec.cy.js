/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MarketplacePage from "../pageObjects/MarketplacePage.js"

const header = new Header();
const marketplacePage = new MarketplacePage();

describe('Marketplace page test suite', () => {

      beforeEach(function () {
            cy.fixture('marketplace').then(data => {
                  this.data = data;
            });
            cy.visit('/');
      });
      
      it.only('AT_033.004 | Header > Navigation > Verify "Marketplace" menu link', function () {
            header.clickMarketplaceMenuLink()
      
            cy.url().should('be.equal', this.data.url)
            marketplacePage.elements.getH1CustomWeatherProducts().should('have.text', this.data.h1CustomProducts)
      })

})