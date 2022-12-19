/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MarketplacePage from "../pageObjects/MarketplacePage.js"
import HistoryBulkPage from "../pageObjects/HistoryBulkPage.js";
import HistoryBulksNewPage from "../pageObjects/HistoryBulksNewPage.js";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";

const header = new Header();
const marketplacePage = new MarketplacePage();
const historyBulk = new HistoryBulkPage();
const historyBulksNew = new HistoryBulksNewPage();
const historicalWeatherDataByStatePage = new HistoricalWeatherDataByStatePage();

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
            cy.fixture('historicalWeatherDataByStatePage').then(data => {
                  this.historicalWeatherDataByStatePage = data;
            });
            cy.fixture('historyBulksNew').then(data => {
                  this.historyBulksNew = data;
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

      it('AT_009.008 | <Menu> Marketplace > Verification than "Place order" button is displayed and leads to URL', function() {
            header.clickMarketplaceMenuLink()
            marketplacePage.elements.getPlaceOrderHistoryBulk().should('be.visible')
            marketplacePage.clickPlaceOrderHistoryBulk()

            cy.url().should('eq', this.urls.placeOrderHistoryBulk)
            historyBulksNew.elements.getHistoryBulksNewTitle().should('be.visible')
      });

      it('AT_061.002 | Marketplace > Historical Data Archives > Historical Weather Data by State > Verifying all state names are in alphabetical order', function () {
            header.clickMarketplaceMenuLink();
            marketplacePage.clickHistoricalDataArchivesDocumentationLink();

            historicalWeatherDataByStatePage.elements.getFullListOfStates().then(($stateNamesArray) => {
                  const stringOfStateNames = $stateNamesArray
                        .toArray()
                        .map(el => el.innerText)
                        .join(' ');
                  
                  expect(stringOfStateNames).to.eql(this.historicalWeatherDataByStatePage.listOfStatesInAlphabeticalOrder.join(' '));
            });
      });

      it('AT_061.004 | Marketplace > Historical Data Archives > Historical Weather Data by State > Verifying price for any state is correct', function () {
            header.clickMarketplaceMenuLink();
            marketplacePage.clickHistoricalDataArchivesDocumentationLink();

            historicalWeatherDataByStatePage.elements.getFullListOfPrices().then(($pricesArray) => {
                  const stringOfPriceNames = $pricesArray
                        .toArray()
                        .map(el => el.innerText)
                        .join(' ');

                  expect(stringOfPriceNames).to.eql(this.historicalWeatherDataByStatePage.listOfPrices.join(' '));
            });
      });

      it('AT_010.003 | Marketplace > Verify link “History Forecast Bulk” are clickable', function () {
            header.clickMarketplaceMenuLink();
            cy.url().should('eql', this.urls.MarketPage);        
            
            marketplacePage.clickHistoryForecastBulk();
            cy.url().should('include', this.urls.historyForecastBulk);
          });

      it('AT_010.005 | Marketplace > Verify link “Historical Weather Data by State for all ZIP codes, USA” are clickable', function () {
            header.clickMarketplaceMenuLink(); 
            cy.url().should('eql', this.urls.MarketPage);
      
            marketplacePage.clickHistoricalWeatherData ()
            cy.url().should('include', this.urls.historicalWeatherData);
      });
      
      it('AT_010.002 | Marketplace > Verify link “History Bulk” are clickable', function () {
            header.clickMarketplaceMenuLink();
        
            marketplacePage.clickHistoryBulkLink();
            cy.url().should('eq', this.urls.placeOrderHistoryBulk);
            historyBulksNew.elements.getHistoryBulksNewTitle().should('have.text', this.historyBulksNew.historyBulksNewTitle);
      });
      
      it('AT_061.006 | Marketplace > Historical Data Archives > Historical Weather Data by State > Verify that the price for each state is correct', function () {
            header.clickMarketplaceMenuLink();
            marketplacePage.clickHistoricalDataArchivesDocumentationLink();

            historicalWeatherDataByStatePage.elements.getFullListOfPrices().then(($arrayOfPrice) => {
                  const listOfPrice = $arrayOfPrice
                        .toArray()
                        .map(el => el.innerText);
                        
                  expect(listOfPrice).to.deep.eq(this.historicalWeatherDataByStatePage.listOfPrices);      
            });
      });

      it('AT_009.009 | Main menu > Marketplace> Verifying that History bulk item is displayed', function () {
            header.clickMarketplaceMenuLink();
            marketplacePage.elements.getHistoryBulkLink().
            should('contain', this.marketPlacePageData.h5HistoryBulk).and('be.visible')
          }) 
      });
