/// <reference types="cypress"/>

import MainPage from "../pageObjects/MainPage.js";

const mainPage = new MainPage();

describe('mainPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('mainPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    })

    it('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', function () {
        mainPage.setSearchInputText(this.data.zipCode);
        mainPage.clickSearchBtn();
        mainPage.elements
            .getSearchInput()
            .invoke('val')
            .should('eq', this.data.zipCode);
    });

    it('AT_005.002 | Main page > Verify the website\'s description', function () {
        mainPage.elements.getPageDescriptionWhiteText().should('have.text', this.data.pageDescriptionWhiteText);
    });
});