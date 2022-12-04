/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import MarketplacePage from "../pageObjects/MarketplacePage";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";

const heder = new Header();
const marketplace = new MarketplacePage();
const historicalWeather = new HistoricalWeatherDataByStatePage();

describe ('historical wether page', function() {

    beforeEach(function () {
        cy.fixture('historicalWeatherDataByStatePage').then(data => {
            this.data = data;
        });
       
        cy.visit('/');
    })

    it('AT_061.005 | Historical Weather Data by State > Verifying that each state has its own ZIP code and particular price', function() {
        heder.clickMarketplaceMenuLink()
        marketplace.clickHistoricalDataArchivesDocumentationLink()
        cy.url().should('contain', this.data.urn)
        historicalWeather.elements.getTitlePage().should('have.text', this.data.titlePage)
            
        historicalWeather.elements.getDataState().then(($el) => {
            const dataStates = $el
                .toArray()
                .map(el => el.innerText.split('\t'))
           
            dataStates.forEach((el, i, arr) => {
                    //check name of State
                expect(arr[i][0]).to.eq(this.data.dataStates[i][0])
                    //check ZIP code
                expect(arr[i][1]).to.eq(this.data.dataStates[i][1])
                    //check price
                expect(arr[i][2]).to.eq(this.data.dataStates[i][2])
            })
        })
    })              
})


