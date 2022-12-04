/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MarketplacePage from "../pageObjects/MarketplacePage.js"
import HistoryBulkPage from "../pageObjects/HistoryBulkPage.js";
import HistoryDataState from "../pageObjects/HistoryDataStatePage.js";

const header = new Header();
const marketplacePage = new MarketplacePage();
const historyBulk = new HistoryBulkPage();
const historyDataState = new HistoryDataState();
const historyBulksNew = new HistoryBulksNewPage();
const historicalWeatherDataByStatePage = new HistoricalWeatherDataByStatePage();
const historyDataState = new HistoryDataState();

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
            cy.fixture('historyDataState').then(historyDataState => {
                  this.historyDataState = historyDataState;
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

      it('009.007 | Marketplace > Verification of displayed "Documentation" button for History bulk', function () {
            header.clickMarketplaceMenuLink()
            marketplacePage.elements.getDocumentationBtnHistoryBulk().should('be.visible')
            marketplacePage.clickDocumentationBtnHistoryBulk()

            cy.url().should('eq', this.urls.HistoryBulk)
            historyBulk.elements.getHistoryBulkTitle().should('have.text', this.historyBulkPageData.HistoryBulkTitle)
      });

      it('AT_061.001 | |Marketplace > Historical Data Archives > Historical Weather Data by State > Verifying the table "List of states, ZIP codes and price" is correct', function () {
            header.clickMarketplaceMenuLink();
            marketplacePage.elements.getDocumentationBtnHistoryDataState().should('be.visible');
            marketplacePage.clickDocumentationBtnHistoryDataState();

            cy.url().should('eq', this.urls.historyDataState);
            historyDataState.elements.getHistoryDataStateTitle().should('have.text', this.historyDataState.HistoryDataStateTitle);

            historyDataState.elements.getStateNameArray().should('have.length', this.historyDataState.StateNameArray.length);

      });

})
