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

    it('AT_026.002 | Maps > Visualization of data on the map Verify that user can Click on any city on the map and see the data', function () {
        header.clickMapsMenuLink()
        cy.url().should('include', this.data.endPoint);
        mapsPage.elements.getSearchIcon().should('be.visible')
        mapsPage.clickOnSearchIcon()
        mapsPage.typeSearchWord(this.data.cityName2)
        mapsPage.sibmitSearch()
        cy.wait(1000)
        mapsPage.elements.getNameOfCity().contains(this.data.cityName2).click();

        mapsPage.elements.getTableHeader().should('contain', this.data.cityName2)
        mapsPage.elements.getTableCountryValue().should('have.text', 'US')
        mapsPage.elements.getTableTempValue()
            .should('contain', 'ºC')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[-.0-9]+/)
        mapsPage.elements.getTableCloudsValue()
            .should('contain', '%')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[.0-9]+/)
        mapsPage.elements.getTableHumidityValue()
            .should('contain', '%')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[.0-9]+/)
        mapsPage.elements.getTablePressureValue()
            .should('contain', 'hPa')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[.0-9]+/)
        mapsPage.elements.getTableWindDirectionValue()
            .should('contain', '°')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[.0-9]+/)
        mapsPage.elements.getTableWindeSpeedValue()
            .should('contain', 'm/s')
            .invoke('text')
            .then(showNumberValuesOnly)
            .should('match', /[.0-9]+/)

        function showNumberValuesOnly(char) {
            return char.replace(/[^0-9.]+/g, '')
        }
    });
});