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

    it.only('AT_055.001 | Main page > Our new product > Solar Radiation API', function () {
        cy.get('.no-mobile-padding h2 span.orange-text').click({force: true});
        cy.get ('.no-mobile-padding h2 span').should('have.text', "new");
        cy.get ('.no-mobile-padding h2 span').should('have.css', 'color', 'rgb(235, 110, 75)');
        
        cy.get('a[href="/api/solar-radiation"]').click({force: true});
        cy.url().should('eq', 'https://openweathermap.org/api/solar-radiation');
        cy.get ('.breadcrumb-title').should('have.text', "Solar Radiation API");
    });
});