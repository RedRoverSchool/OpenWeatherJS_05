/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js";
import PartnersPage from "../pageObjects/PartnersPage.js";
import DrupalPage from "../pageObjects/DrupalPage.js";
import WordpressPage from "../pageObjects/WordpressPage.js"
 
const header = new Header();
const partnersPage = new PartnersPage();
const drupalPage = new DrupalPage();
const wordpressPage = new WordpressPage();
 
describe('Partners page test suite', () => {

    beforeEach(function() {
        cy.fixture('partnersPage').then(data => {
            this.data = data;
        });

        cy.fixture('url').then(url => {
            this.url = url;
        });

        cy.fixture('drupalPage').then(valueTitle => {
            this.drupalPageTitle = valueTitle;
        });

        cy.fixture('wordpressPage').then(textLink => {
            this.textLink = textLink;
        }) 

        cy.visit('/');

        header.clickPartnersMenuLink();
    });

    it('AT_012.001 | Partners > CMS > Verifying 4 buttons exist in the section', function () {       
        partnersPage.elements.getCMSNameButtons().each(($el, i) => {
            expect($el.text()).to.equal(this.data.CMSNameButtons[i]);
        });
    });

    it('AT_012.002 | Partners > CMS > Verify "See on the website" button', function() {
        partnersPage.clickCmsSeeOnTheWebsiteButton();

        cy.url().should('eq', this.url.drupalWebsite);
        drupalPage.elements.getHeaderLocator().should('have.attr', 'title', this.drupalPageTitle.headerTitle);        
    })

    it('AT_012.004 | Partners > CMS > Verify "View widget" button', function () {
        partnersPage.clickCmsViewWidgetButton();

        cy.url().should('eq', this.url.wordpressWebsite);
        wordpressPage.elements.getHeaderGetWordPressBtn().should('contains.text', this.textLink.headerGetWordPressLink);
    })
});