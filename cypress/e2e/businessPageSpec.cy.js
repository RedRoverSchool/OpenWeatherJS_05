/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import BusinessPage from "../pageObjects/BusinessPage.js";
import MainAboutUsPage from "../pageObjects/MainAboutUsPage.js";
import MainProductPage from "../pageObjects/MainProductPage.js";

const header = new Header();
const businessPage = new BusinessPage();
const mainAboutUsPage = new MainAboutUsPage();
const mainProductPage = new MainProductPage();

describe('businessPageSpec', () => {
    
    beforeEach(function () {
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('titles').then(data => {
            this.data = data;
        });
        
        cy.visit('/');
    })

    it('AT_038.002 | For business page > About us', function () {
        header.clickBusinessMenuLink();

        mainAboutUsPage.clickAboutUsButton();
        
        cy.url().should('eq', this.url.mainAbout);
        mainAboutUsPage.elements.getTitle().should('contain', this.data.titleAfterAboutUsBtn);
    });

    it('AT_038.003 | For business page > Our producs', function () {
        header.clickBusinessMenuLink();

        mainAboutUsPage.clickOurProductButton();

        cy.url().should('eq', this.url.mainProduct)
        mainProductPage.elements.getTitle().should('contain', this.data.titleAfterOurProductBtn)
    })  
});

