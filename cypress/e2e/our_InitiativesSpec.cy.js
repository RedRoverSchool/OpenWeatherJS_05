/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MainPage from "../pageObjects/MainPage.js";

const header = new Header();
const mainPage = new MainPage()

describe('our_initiatives', () => {
    
    beforeEach(function () {
        cy.fixture('mainPage').then(data => {
            this.data = data;
        });
        cy.visit('/');

    })

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page',function () {
        header.clickInitiativePage()
        header.clickLogoLink()

        mainPage.elements.getMainPageContent().should('have.text', this.data.mainText)      
    });

})