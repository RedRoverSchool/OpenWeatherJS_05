/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MainPage from "../pageObjects/MainPage.js";
 
const header = new Header();
const mainPage = new MainPage()
 
describe('Partners page test suite', () => {

    beforeEach(function() {
        cy.fixture('initiativesPage.json').then(data => {
            this.data = data;
        });
        cy.visit('/');
    })

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page',function () {
        header.clickInitiativesLink()
        header.clickLogoLink()
        
        mainPage.elements.getHeader().should('have.text', this.data.mainText)      
    })
})