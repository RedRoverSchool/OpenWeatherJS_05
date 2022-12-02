/// <reference types="cypress" />

import UserPageBillingPlan from "../pageObjects/UserPageBillingPlan";
import SignInPage from "../pageObjects/SignInPage";
import Header from "../pageObjects/Header";
import UserHomePage from "../pageObjects/UserHomePage";

const userPageBillingPlan = new UserPageBillingPlan()
const signInPage = new SignInPage();
const header = new Header();
const userHomePage = new UserHomePage();

describe('User Page Billing plans suite', () => {

    beforeEach(function () {
            cy.fixture('userPageBillingPlan').then(data => {
                  this.data = data;
            });

            cy.fixture('signInPage').then(login => {
                this.login = login;
            });
            cy.visit('/');
    });

    it('AT_048.004 | User page > Billing plans > Verify that after the user clicks on the link "One Call by Call" subscription plan" open a new page url.', function() {
      
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password)

    userHomePage.elements
        .getBillingPlanLink()
        .should('be.visible')
    userHomePage.clickBillingPlanLink()
    userPageBillingPlan.elements
        .getOneCallByCallLink()
        .should('be.visible')
    userPageBillingPlan.clickOneCallByCallLink()

    userPageBillingPlan.elements.getTitle()
        .should('be.visible')
        .and('have.text', this.data.titleText)

    });

    it('AT_048.001 | User page > Billing plans > Verify page for billing plans', function () {
    
        //login
        header.clickSignInMenuLink();
        signInPage.signIn(this.login.userEmail, this.login.userPassword);

        //open 'My services' and verify link and page
        header.clickUserMyServicesLink()
        userHomePage.clickBillingPlanLink();
        userPageBillingPlan.clickOneCallByCallLink();
        userPageBillingPlan.elements.getTitle().should('contain', this.data.titleText);

    });
});
