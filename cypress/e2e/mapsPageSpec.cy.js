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
        mapsPage.typeSearchWord(this.data.cityName2)
        mapsPage.submitSearch()
        mapsPage.waitForInputDisappear()
        mapsPage.elements.getNameOfCity().contains(this.data.cityName2).click();
        mapsPage.elements.getTableTempValue()
            .contains(new RegExp(`[-.0-9]+`))
            .contains('º')
    });
});