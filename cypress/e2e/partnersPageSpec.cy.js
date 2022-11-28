/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import PartnersPage from "../pageObjects/PartnersPage.js"
import PluginsWaypointPage from "../pageObjects/PluginsWaypointPage.js";
 
const header = new Header();
const partnersPage = new PartnersPage();
const pluginsWaypointPage = new PluginsWaypointPage();
 
describe('Partners page test suite', () => {

    beforeEach(function() {
        cy.fixture('partnersPage').then(data => {
            this.data = data;
        });

        cy.fixture('url').then(url => {
            this.url = url;
        });

        cy.visit('/');
    });

    it('AT_012.001 | Partners > CMS > Verifying 4 buttons exist in the section', function () {
        header.clickPartnersMenuLink();

        partnersPage.elements.getSectionsNames().each(($el, i) => {
            expect($el.text()).to.equal(this.data.sectionsNames[i]);
        });
    });

    it('AT_012.005 | Partners > CMS > Verify “View plugin” button for WordPress HD Weather Widget by The Waypoint', function () {
       header.clickPartnersMenuLink();
       partnersPage.clickWaypointPluginButton();
       
       cy.url().should('eq', this.url.widgetWaypointPlugin);
       pluginsWaypointPage.elements.getPluginsWaypointTitle().should('be.visible'); 
    });
});


