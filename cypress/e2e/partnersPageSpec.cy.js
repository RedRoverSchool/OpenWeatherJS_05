/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js";;
import PartnersPage from "../pageObjects/PartnersPage.js";
import DrupalPage from "../pageObjects/DrupalPage.js";
import PluginsWaypointPage from "../pageObjects/PluginsWaypointPage.js";
import WordpressPage from "../pageObjects/WordpressPage.js";
import PluginsWPCloudyPage from "../pageObjects/PluginsWPCloudyPage.js";
 
const header = new Header();
const partnersPage = new PartnersPage();
const drupalPage = new DrupalPage();
const pluginsWaypointPage = new PluginsWaypointPage();
const wordpressPage = new WordpressPage();
const pluginsWPCloudyPage = new PluginsWPCloudyPage();
 
describe('Partners page test suite', () => {

    beforeEach(function() {
        cy.fixture('partnersPage').then(data => {
            this.data = data;
        });

        cy.fixture('drupalPage').then(valueTitle => {
            this.drupalPageTitle = valueTitle;
        });
        
        cy.fixture('url').then(url => {
            this.url = url;
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

    it.skip('AT_012.002 | Partners > CMS > Verify "See on the website" button', function() {        
        partnersPage.clickCmsSeeOnTheWebsiteButton();

        cy.url().should('eq', this.url.drupalWebsite);
        drupalPage.elements.getHeaderLocator().should('have.attr', 'title', this.drupalPageTitle.headerTitle);        
    })
    
    it('AT_012.005 | Partners > CMS > Verify “View plugin” button for WordPress HD Weather Widget by The Waypoint', function () {       
       partnersPage.clickWaypointPluginButton();
       
       cy.url().should('eq', this.url.widgetWaypointPlugin);
       pluginsWaypointPage.elements.getPluginsWaypointTitle().should('be.visible'); 
    });

    it('AT_012.004 | Partners > CMS > Verify "View widget" button', function () {
        partnersPage.clickCmsViewWidgetButton();

        cy.url().should('eq', this.url.wordpressWebsite);
        wordpressPage.elements.getHeaderGetWordPressBtn().should('contains.text', this.textLink.headerGetWordPressLink);
    })

    it('AT_012.006 | Partners > CMS > Verify “View plugin” button for WordPress WPCloudy Plugin', function() {
        partnersPage.clickWPCloudyPluginButton();

        cy.url().should('eq', this.url.widgetWPCloudyPlugin);
        pluginsWPCloudyPage.elements.getPluginsWPCloudyTitle().should('be.visible');
    });
});