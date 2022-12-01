/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import MainPage from "../pageObjects/MainPage.js";
import SolarRadiationPage from "../pageObjects/SolarRadiationPage.js";

const mainPage = new MainPage();
const header = new Header;
const solarRadiationPage = new SolarRadiationPage();

describe('mainPageSpec', () => {

    beforeEach(function () {
        cy.fixture('mainPage').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('titles').then(titles => {
            this.titles = titles;
        });

        cy.fixture('solarRadiationPage').then(solarRadiationPage => {
            this.solarRadiationPage = solarRadiationPage;
        });

        cy.fixture('bugHunters').then(info => {
            this.info = info;
        });

        cy.visit('/');
    })

    it('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', function () {
        mainPage.setSearchInputText(this.data.searchInputText.zipCode);
        mainPage.clickSearchBtn();
        mainPage
            .elements
            .getSearchInput()
            .invoke('val')
            .should('eq', this.data.searchInputText.zipCode);
    });

    it('AT_001.008 | Main page > Section with search > Verify entered a City name into the Search city field', function () {
        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage
            .elements
            .getSearchInput()
            .invoke('val')
            .should('eq', this.data.searchInputText.cityName);
    });

    it('AT_005.002 | Main page > Verify the website\'s description', function () {
        mainPage.elements.getPageDescriptionWhiteText().should('have.text', this.data.pageDescriptionWhiteText);
    });

    it('AT_045.006 | Main page > Section with 8-day forecast > Verifying the weather forecast for 8 days is displayed in the section', function () {
        mainPage.elements.getForecastDays().should('have.length', this.data.forecastDaysLength);
    });

    it('AT_045.007 | Main page > Section with 8-day forecast > Verifying the first displayed day in the section matches today\'s date', function () {
        const date = new Date().toUTCString().split(' ');
        const correctDate = [];
        correctDate.push(date[0], date[2], date[1]);
        const todaysDate = correctDate.join(' ');

        mainPage.elements.getForecastFirstDay().should('have.text', todaysDate);
    });

    it('AT_001.002 | Main page > Section with search > Search City > On clicking the Search button, Dropdown menu with relevant options appears', function () {
        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage.elements
            .getSearchResultsDropdown()
            .should('exist')
            .each($el => {
                cy.wrap($el).should('contain', this.data.searchInputText.cityName)
            })
    });

    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', function () {
        cy.visit(this.url.partnerPageLink);

        header.clickLogoLink();

        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.data.mainText);
    });

    it('AT_045.001 | Main page > Section with 8-day forecast>See the weather forecast for 8 days', function () {
        mainPage.elements.getForecastDays().should('have.length', this.data.forecastDaysLength);
    });

    it('AT_001.014 | Main page > Section with search > Search City > Verify that entered city is displayed into the dropdown', function () {
        mainPage.elements.getSearchInput().type(this.data.searchInputText1.city);
        mainPage.clickSearchBtn();

        mainPage.elements.getSearchResultsDropdown().contains(this.data.searchInputText1.searchResult).click();
    });

    it('AT_037.001 | Main page [maps] > Verify " OpenStreetMap"(c) link', function () {
        let getRightTopLocation = '[class="leaflet-top leaflet-right"]'
        mainPage.elements.getCopyrightMapLink().should('include.text', this.data.copyright);
        mainPage.elements.getCopyrightMapLink().parents(getRightTopLocation);
    });

    it('AT_037.002 | Main page [maps] > Verify clicking on the copyright sign', function () {
        mainPage.clickCopyrightMapLink();
        cy.url().should('eq', this.url.urlOpenStreetMap);
        cy.title().should('eq', this.titles.copyrightTitle);
    });

    it('AT_055.001 | Main page > Our new product > Solar Radiation API', function () {
        mainPage.elements.getOurNewProductSubHeaderTitle()
            .should('have.text', "new").and('have.css', 'color', this.data.RGB);
        mainPage.clickSolarRadiationLink();

        cy.url().should('eq', this.url.SolarRadiationURL);
        solarRadiationPage.elements.getSolarRadiationPageTitle().should('have.text', this.solarRadiationPage.solareRadiationPageTitle);
    });

    it('AT_005.004 | Main Page > Verify the website name and description', function () {
        mainPage.elements.getMainPageContent().should('have.text', this.data.mainText);
        mainPage.elements.getPageDescriptionWhiteText().should('have.text', this.data.pageDescriptionWhiteText);
    });

    it('AT_004.001 | Main page > Verify the temperature can be switched from Imperial to Metric', function () {
        mainPage.elements.getToggleTempretureDefault().should('contain', this.data.tempretureScaleDefault);
        mainPage.elements.getToggleTempreture().should('contain', this.data.tempretureScale);
        mainPage.clickTempretureToggle;
    });

    it('AT_045.008 | Main page > Section with 8-day forecast > See the weather forecast for 8 days', function () {
        let current_date = String();

        mainPage.elements.getForecastDays().should('have.length', this.data.forecastDaysLength);
        mainPage.elements.getCurrentDate().invoke('text').then(function  (date)  {
            current_date = date.split(',')[0]
        
        });
        mainPage.elements.getForecastFirstDay().invoke('text').then((date) =>  {
            expect(date).to.include(current_date);
        });
    });

    it('AT_045.009 | Main page > Section with 8-day forecast > Detailed weather for each of these days is displayed', function () {
        mainPage.elements.getIconToDetailedWeather().each((el, i) => {
            mainPage.elements.getIconToDetailedWeather()
                .eq(i)
                .click({ force: true });
            mainPage.elements.getDailyDetailContainerWeather().should('be.visible');
            mainPage.elements.getTimeOfDayInDetailedWeather()
                .should('have.text', this.data.weatherDetails)
    });
    });

    it('AT_001.013 | Main page > Search section > Verify "Search City" valid input shows dropdown', function () {
        mainPage.setSearchInputText(this.info.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage.assertDropdownContains(this.info.searchInputText.cityName);
    });

    it('AT_001.003 | Main page > Section with search > Search City > Verify a user is able to select a city from the search results dropdown', function () {
        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage.elements
                .getSearchResultsDropdown()
                .should('exist')

        mainPage.clickSearchResultFromDropdown()
        cy.url().should('include', '/city/')
        mainPage.elements
                .getCityNameSubHeaderTitle()
                .should('contain', this.data.searchInputText.cityName)
    })

    it.only('AT_001.004 | Main page > Section with search > Search City > Verify weather icon and current weather in Metric system are displayed', function () {
        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage.elements
                .getSearchResultsDropdown()
                .should('exist')
        mainPage.clickSearchResultFromDropdown()
        mainPage.elements
                .getCityNameSubHeaderTitle()
                .should('contain', this.data.searchInputText.cityName)

        mainPage.elements
                .getWeatherIcon()
                .should('exist')
        mainPage.elements
                .getToggleMetric()
                .should('exist')
        mainPage.elements
                .getTemperatureHeading()
                .should('contain','°C')
    })
    
});

