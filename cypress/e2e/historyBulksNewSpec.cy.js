/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import MarketplacePage from "../pageObjects/MarketplacePage.js"
import HistoryBulkPage from "../pageObjects/HistoryBulkPage.js";
import HistoryBulksNewPage from "../pageObjects/HistoryBulksNewPage.js";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";

const header = new Header();
const marketplacePage = new MarketplacePage();
const historyBulksNew = new HistoryBulksNewPage();

describe('HistoryBulksNewPage page test suite', () => {

    beforeEach(function () {
        cy.fixture('historyBulksNew').then(data => {
            this.historyBulksNew = data;
        });
        cy.visit('/');
    });

    it('AT_009.0xx | HistoryBulksNewPage > Verification import data locations works correctly', function () {
        header.clickMarketplaceMenuLink()
        marketplacePage.clickHistoryBulkLink();

        historyBulksNew.clickOnSearchField();
        historyBulksNew.waitForSearchPopUpAppear();
        historyBulksNew.clickOnImportOnSearchPopUp();
        historyBulksNew.clickOnImportCSVfileButton();
        historyBulksNew.selectCSVFile();
        historyBulksNew.elements.getLocationsName().then(($cityNames) => {
            const listCityNames = $cityNames
                .toArray()
                .map(el => el.innerText.trim());

            expect(listCityNames).to.deep.eq(this.historyBulksNew.locationCityNames);
        })

    });
});
