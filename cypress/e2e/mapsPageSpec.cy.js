/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import MapsPage from "../pageObjects/MapsPage.js"

const header = new Header();
const mapsPage = new MapsPage();

describe('Maps page test suite', () => {

    beforeEach(function () {
        cy.fixture('mapsPage').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.visit('/');
    });

    it('AT_027.004 | Maps > Section with the scale > The scale\'s name matches the label\'s name after selecting "Pressure"', function () {
        header.clickMapsMenuLink();
        mapsPage.clickPressureLabel();

        mapsPage.elements.getScaleName().should('contain.text', this.data.pressureScaleName);
    });

    it('AT_027.003 |Maps > Section "weather control" > scale-details changes when switching data to Pressure', function () {
        header.clickMapsMenuLink()
        cy.url().should("include", this.url.mapsPage)
        mapsPage.clickPressureLabel()

        mapsPage.elements.getScaleName().should('contain', this.data.pressureScaleNameFull)
    });

    it.skip('AT_026.004 | Maps > Click on any city on the map and see the data', function () {
        header.clickMapsMenuLink();
        mapsPage.elements.getCityName().contains(this.data.cityName).click();

        mapsPage.elements.getCityData().each(($el, i) => {
            expect($el.text()).to.include(this.data.cityData[i]);
        })
    });

    it('RF_027.003 |Section with the scale >The scale in the lower right corner changes to "Precipitation, mm/h".', 
        function() {

        header.clickMapsMenuLink();
        cy.url().should('include',this.data.endPoint);
        mapsPage.elements.getTemperatureLabel().should('have.text',' Temperature');

        mapsPage.clickGlobalPrecipitationLabel();

        mapsPage.elements.getScale().should('contain', 'Precipitation, mm/h')
    });

    it('AT_027.005 | Maps > Section with the scale > The scale\s name matches the label\s name after selecting "Wind speed"', function()  {
        header.clickMapsMenuLink()
        cy.url().should("include", this.url.mapsPage)
       
        mapsPage.clickWindSpeedLabel()

        mapsPage.elements.getScale().should('contain', 'Wind speed, m/s')
    });

    it('AT_26.005 | Maps > Verify search city works correctly Happy path', function () {
        const expectedCity =this.data.cityName;

        header.clickMapsMenuLink();
        mapsPage.clickOnSearchIcon();
        mapsPage.sendKeysToSearchInput(expectedCity);

        cy.wait(5000)

        mapsPage.elements.getTagWithCityName().filter(`:contains(${expectedCity})`).each(($span, i) => {
            cy.wrap($span).then((cities) => {

                let currentCity = cities.toArray().map(el => el.innerText)
                
                if (currentCity == expectedCity) {
                    expect(cities.text()).to.eq(expectedCity)
                    cy.get(cities).should("be.visible").click()
                    mapsPage.elements.getCityNameExpandedInfo().should("have.text", expectedCity)
                
                    return false;
                }
            });
        });   
    });

    it('RF_027.003 |Section with the scale >The scale in the lower right corner changes to "Precipitation, mm/h".',
        function () {

            header.clickMapsMenuLink();
            cy.url().should('include', this.data.endPoint);
            mapsPage.elements.getTemperatureLabel().should('have.text', ' Temperature');

            mapsPage.clickGlobalPrecipitationLabel();

            mapsPage.elements.getScale().should('contain', 'Precipitation, mm/h')
        });

    it('AT_026.002 | Maps > Verify that user can select any city on the map and see the correct data for Temp row', function () {
        header.clickMapsMenuLink()
        mapsPage.clickOnSearchIcon()
        mapsPage.sendKeysToSearchInput(this.data.cityName2)
        mapsPage.waitForInputDisappear()
        mapsPage.elements.getNameOfCity().contains(this.data.cityName2).click()

        mapsPage.elements.getTableTempValue().
        then(element => {
            const text = element.text()
            expect(text).to.match(/^[C0-9º.-]*/)
          })
    });
});