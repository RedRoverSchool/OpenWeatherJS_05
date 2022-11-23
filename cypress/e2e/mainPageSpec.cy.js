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

    it('AT_051.002 | API > Testing Home button > Verify that after clicking on the Home link on the API page the user gets redirected to the Home page of the site.', function () {
        mainPage.clickApiLink()
        mainPage.elements
                .getHomePageButton()
                .should('have.text', 'Home')
        mainPage.clickHomePageButton()

        mainPage.elements.getMainPageContent()
                .should('have.text', 'OpenWeather')
    });

    it('AT_045.006 | Main page > Section with 8-day forecast > Verifying the weather forecast for 8 days is displayed in the section', function () {
        mainPage.elements.getForecastDays().should('have.length', this.data.forecastDaysLength);
    });
});