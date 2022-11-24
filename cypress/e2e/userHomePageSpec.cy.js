/// <reference types="cypress" />

import UserHomePage from "../pageObjects/UserHomePage";
const userHomePage = new UserHomePage()

describe('User Home Page suite', () => {

    beforeEach(function () {
            cy.fixture('userHomePage').then(data => {
                  this.data = data;
            });
            cy.visit('/');
    });

    it('AT_043.005 | NavBar > User > Verify that title of 3 text blocks on the home page have the same color', function() {
      
    cy.loginNoGroup(this.data.userProfile.email, this.data.userProfile.password)

    userHomePage.elements.getNavBarBlocks()
        .should('have.length', 3)
        
    userHomePage.elements.getNavBarBlocks()
        .each(($el, idx) => {
            cy.wrap($el).should('have.css', 'color', 'rgb(233, 110, 80)')
              })

    })
})