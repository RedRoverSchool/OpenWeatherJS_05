/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import MapsPage from "../pageObjects/MapsPage.js"
 
const header = new Header();
const mapsPage = new MapsPage();
 
describe('Maps page test suite', () => {

    beforeEach(function() {
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
    })
});
