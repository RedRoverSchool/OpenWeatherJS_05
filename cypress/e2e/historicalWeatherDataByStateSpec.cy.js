/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import MarketplacePage from "../pageObjects/MarketplacePage";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";

const header = new Header();
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
        header.clickMarketplaceMenuLink()
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
    
    it('AT_061.007 | Historical Weather Data by State > Verify each state has an appropriate ZIP code', function() {
        header.clickMarketplaceMenuLink()
        marketplace.clickHistoricalDataArchivesDocumentationLink()

        historicalWeather.elements.getDataStateTable().should('be.visible')

        historicalWeather.elements.getDataState().then(($tableRow) => {
            const statesAndZipCodeArray = $tableRow
                .toArray()
                .map(el => el.innerText.split('\t').slice(0,2))

            statesAndZipCodeArray.forEach((el, i, arr) => {
                expect(arr[i][0]).to.eq(this.data.dataStates[i][0])
                expect(arr[i][1]).to.eq(this.data.dataStates[i][1])
            })    
        })
    })

    it('Verify zipCode state Alaska', function () {
        header.clickMarketplaceMenuLink()
        marketplace.clickHistoricalDataArchivesDocumentationLink()
       
        historicalWeather.elements.getFullListOfStates().each(($el,index,$list) => {
            const text = $el.text().trim();
            if(text == this.data.dataStates[1][0]){
                historicalWeather.elements.getFullListOfStates().eq(index).next().then(function(zip) {
                    const zipCode = zip.text().trim();
                    expect(zipCode).to.equal(this.data.dataStates[1][1]);
                });
            }
        })
    })

    it('AT_061.008 | Historical Weather Data by State > Verifying that each state has its own ZIP code and particular price', function() {
        header.clickMarketplaceMenuLink()
        marketplace.clickHistoricalDataArchivesDocumentationLink()
            
        historicalWeather.elements.getDataState().then(($el) => {
            const dataStates = $el
                .toArray()
                .map(el => el.innerText.split('\t'))
                expect(dataStates).to.deep.eq(this.data.dataStates)
        })
    })

    it('AT_061.003 | Marketplace > Historical Data Archives > Historical Weather Data by State > Verify sorted by names', function () {
        let currentStatesArr = Array();
        header.clickMarketplaceMenuLink();
        marketplace.clickHistoricalDataArchivesDocumentationLink();

        historicalWeather.elements.getFullListOfStates().then((list) => {
              currentStatesArr = list.toArray().map(el => el.innerText)
                let sortedByNames = [...currentStatesArr].sort((a, b) => a.localeCompare(b))

                expect(currentStatesArr).to.deep.eql(sortedByNames)
        });
    });

    it ('AT_061.009 | Historical Weather Data by State > Verify that the table "List of states, ZIP codes and price" has all 50 states and Washington DC; their names are in alphabetic order.', function () {
        header.clickMarketplaceMenuLink();
        marketplace.clickHistoricalDataArchivesDocumentationLink();

        historicalWeather.elements.getFullListOfStates().then(($data) => {
            const stateNameData = $data
            .toArray()
            .map(el => el.innerText)
            console.log(stateNameData);
            expect(stateNameData.length).to.equal(this.data.listOfStatesInAlphabeticalOrder.length);
            expect(stateNameData).to.deep.eq(this.data.listOfStatesInAlphabeticalOrder);
        })
    })
})