/// <reference types="cypress" />

import UserPageBillingPlan from "../pageObjects/UserPageBillingPlan";
const userPageBillingPlan = new UserPageBillingPlan()

describe('User Page Billing plans suite', () => {

    beforeEach(function () {
            cy.fixture('userPageBillingPlan').then(data => {
                  this.data = data;
            });
            cy.visit('/');
    });

    it('AT_048.004 | User page > Billing plans > Verify that after the user clicks on the link "One Call by Call" subscription plan" open a new page url.', function() {
      
    cy.loginNoGroup(this.data.userProfile.email, this.data.userProfile.password)
    userPageBillingPlan.elements
        .getBillingPlanLink()
        .should('be.visible')
    userPageBillingPlan.clickBillingPlanLink()
    userPageBillingPlan.elements
        .getOneCallByCallLink()
        .should('be.visible')
    userPageBillingPlan.clickOneCallByCallLink()

    userPageBillingPlan.elements.getTitle()
        .should('be.visible')
        .and('have.text', this.data.titleText)

    });
});
