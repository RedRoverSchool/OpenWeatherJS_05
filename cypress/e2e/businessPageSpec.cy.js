/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import BusinessPage from "../pageObjects/BusinessPage.js";

const header = new Header();
const businessPage = new BusinessPage();

describe('businessPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
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
        header.clickBusinessMenuLink()
    
        cy.get('a.btn_block[href="#main_about"]').click({force: true});
    
        cy.url().should('eq', 'https://openweather.co.uk/#main_about');
        cy.get('h2[style="margin-top: 0;"]').should('include.text', 'OpenWeather products are all');
    });
});

