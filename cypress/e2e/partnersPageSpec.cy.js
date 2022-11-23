/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import PartnersPage from "../pageObjects/PartnersPage.js"
 
const header = new Header();
const partnersPage = new PartnersPage();
 
describe('Partners page test suite', () => {

    beforeEach(function() {
        cy.fixture('partnersPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_012.001 | Partners > CMS > Verifying 4 buttons exist in the section', function () {
        header.clickPartnersMenuLink();

        partnersPage.elements.getSectionsNames().each(($el, i) => {
            expect($el.text()).to.equal(this.data.sectionsNames[i]);
        });
    });

});


