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
            cy.wrap($el).should('have.css', 'color', this.data.color)
              })

    })

    it('AT_043.004 | NavBar > User > Verify that tab "New Products" has 3 text-block', function() {
 
        cy.loginNoGroup(this.data.userProfile.email, this.data.userProfile.password)
    
        userHomePage.clickNewProductsLink()
    
        userHomePage.elements.getNavBarBlocks()
            .should('have.length', 3)
        userHomePage.elements.getNavBarBlocks()
            .each(($el, idx) => {
            expect($el.text()).to.include(this.data.textBlocs[idx])
            })
    }) 

    it('AT_043.002 | NavBar > User > My profile > Verify that NavBar has 9 options', function() {
 
        cy.login(this.data.userProfile.email, this.data.userProfile.password)

        userHomePage.elements.getNavBarLink().should('have.length', 9)
        userHomePage.elements.getNavBarLink().each(($el, idx) => {
            expect($el.text()).to.include(this.data.NavBar[idx])
          })
    })
})