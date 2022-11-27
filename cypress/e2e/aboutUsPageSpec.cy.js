/// <reference types="cypress"/>

import Footer from "../pageObjects/Footer";
import AboutUs from "../pageObjects/AboutUsPage";
import ApiPage from "../pageObjects/ApiPage";
import Header from "../pageObjects/Header";
import BusinessPage from "../pageObjects/BusinessPage";


const footer = new Footer();
const aboutUs = new AboutUs();
const apiPage = new ApiPage();
const header = new Header();
const businessPage = new BusinessPage();


describe('About Us', () => {

    beforeEach(function () {
        cy.fixture('url').then(url  => {
            this.url = url;
        });
        cy.fixture('aboutUsPage').then(data => {
            this.data = data;
        })
        cy.visit('/');
    })

    it('AT_028.006 | About us > Verify "Products Documentation" button redirects to API page', function() {
        footer.clickAboutUsLink();
        aboutUs.clickProductsDocumentationButton();

        cy.url().should('include', this.url.API);
        apiPage.elements.getWeatherApiTitle().should('be.visible');
    });

    it('AT_038.002 | About us > Verify that button  "About us" regirects to a about us page', function () {
        header.clickBusinessMenuLink();
    
        businessPage.clickGetAboutUsButton();
    
        cy.url().should('eq', this.url.MainAbout);
        aboutUs.elements.getTitleOpenWhetherProducs().should('include.text', this.data.h2title);
    });

});