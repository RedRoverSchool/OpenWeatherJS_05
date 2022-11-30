/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import BusinessPage from "../pageObjects/BusinessPage.js";
import MainAboutUsPage from "../pageObjects/MainAboutUsPage.js";

const header = new Header();
const businessPage = new BusinessPage();
const mainAboutUsPage = new MainAboutUsPage();

describe('businessPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url;
        })
        cy.fixture('mainAboutPage').then(data2 => {
            this.data2 = data2;
        })
        cy.visit('/');
    })
        
    it('AT_034.001 | <Header > verify "For Business" button', function () {
        header.clickBusinessMenuLink()
        cy.url().should('eq', this.data.url)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
    });

    it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
        header.clickBusinessMenuLink()

        cy.url().should('eq', this.data.url)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
    });

    it('AT_038.002 | For business page > About us', function () {
        header.clickBusinessMenuLink();

        mainAboutUsPage.clickAboutUsButton();
        
        cy.url().should('eq', this.url.mainAbout);
        mainAboutUsPage.elements.getTitle().should('contain', this.data2.text);
        // cy.get('h2[style="margin-top: 0;"]').should('include.text', 'OpenWeather products are all');
    });
});

