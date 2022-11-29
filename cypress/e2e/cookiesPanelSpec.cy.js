/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js";
import CookiesPanel from "../pageObjects/CookiesPanel.js";

const header = new Header;
const cookiesPanel = new CookiesPanel();
 
describe('Footer test suite', () => {

    beforeEach(function() {
        cy.fixture('cookiesPanel').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it("AT_044.004 | Footer > PopUps > Manage cookies > Verify the background color of a button and link when the element is in mouse focus", function () {
      header.clickGuideMenuLink();

      cookiesPanel.elements.getCookiesControlElements().each(el => {
          cy.wrap(el)
              .should('be.visible')
              .and('have.css', 'background-color', this.data.cookiesControlElementsBackground)
              .focus()
              .should('have.css', 'background-color', this.data.cookiesControlElementsBackgroundHover)
      });
  })

    
});