/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import MarketplacePage from "../pageObjects/MarketplacePage";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";
import { all } from "cypress/types/bluebird";

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

    it('AT_061.005 |Marketplace > Historical Data Archives > Historical Weather Data by State >Verifying that each state has its own ZIP code', function() {
        heder.clickMarketplaceMenuLink()
        marketplace.clickHistoricalDataArchivesDocumentationLink()
        cy.url().should('contain', this.data.urn)
        historicalWeather.elements.getTitlePage().should('have.text', this.data.titlePage)
               
        historicalWeather.elements.getFullListOfStates().then(($name) => {
            let nameState = $name
                .toArray()
                .map(el => el.innerText.trim())

            nameState.forEach((el, i) => {
                expect(el).to.eql(this.data.dataStates[i][0])
            })       
        })                  
                  
        historicalWeather.elements.getFullListOfZIPcodes().then(($code) => {
            const zipCode = $code
                .toArray()
                .map(el => el.innerText.trim())

            zipCode.forEach((el, i) => {
                expect(el).to.eql(this.data.dataStates[i][1])
            })         
        })


    })
              
 })


