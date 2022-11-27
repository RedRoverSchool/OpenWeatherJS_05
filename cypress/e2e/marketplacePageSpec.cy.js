/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MarketplacePage from "../pageObjects/MarketplacePage.js"
import HistoryBulkPage from "../pageObjects/HistoryBulkPage.js";

const header = new Header();
const marketplacePage = new MarketplacePage();
const historyBulk = new HistoryBulkPage();

describe('Marketplace page test suite', () => {

      beforeEach(function () {
            cy.fixture('marketplace').then(data => {
                  this.marketPlacePageData = data;
            });
            cy.fixture('url').then(data => {
                  this.urls = data;
            });
            cy.fixture('historybulk').then(data => {
                  this.historyBulkPageData = data;
            });
            cy.visit('/');
      });
      
      it('AT_033.004 | Header > Navigation > Verify "Marketplace" menu link', function () {
            header.clickMarketplaceMenuLink()
      
            cy.url().should('be.equal', this.marketPlacePageData.url)
            marketplacePage.elements.getH1CustomWeatherProducts().should('have.text', this.marketPlacePageData.h1CustomProducts)
      })

      it('AT_010.011 |  Marketplace > Verify that all links on the page have the same color', function () {
        header.clickMarketplaceMenuLink();
        
        marketplacePage.elements.getAllProductTitles().each(($el) => {
            cy.wrap($el).should('have.css', 'color', this.marketPlacePageData.productTitleColor);
        });
    });

      it('AT_009.003 | Main menu > Marketplace verification of displayed "Documentation" button for History bulk', function () {
           header.clickMarketplaceMenuLink()
           marketplacePage.elements.getDocumentationBtnHistoryBulk().should('be.visible')
           marketplacePage.clickDocumentationBtnHistoryBulk()

           cy.url().should('eq', this.urls.HistoryBulk)
           historyBulk.elements.getHistoryBulkTitle().should('have.text', this.historyBulkPageData.HistoryBulkTitle)  
      })

      it('AT_010.004 | Marketplace > Verify the color of all orange links', function () {
            header.clickMarketplaceMenuLink()
          
            marketplacePage.elements.getAllProductTitles().each(el => {
                  cy.wrap(el).should('have.css', 'color', this.marketPlacePageData.productTitleColor)
            })
      });

})
