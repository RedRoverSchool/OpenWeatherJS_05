/// <reference types="cypress" />

import Footer from "../pageObjects/Footer.js"
import WidgetsPage from "../pageObjects/WidgetsPage.js";

const footer = new Footer();
const widgetsPage = new WidgetsPage();

describe('Widgets page test suite', () => {

    beforeEach(function() {
        cy.fixture('widgetsPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_021.003 | Footer > Widgets > Verify there are 9 widgets on the page', function() {
        footer.clickWidgetsLink();
        widgetsPage.elements.getWidgets().should('have.length', this.data.widgetsQuantity)
                          .and('be.visible')
    });
});