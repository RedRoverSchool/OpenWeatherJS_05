/// <reference types="cypress" />

import UserPageBillingPlan from "../pageObjects/UserPageBillingPlan";
import SignInPage from "../pageObjects/SignInPage";
import Header from "../pageObjects/Header";
import UserHomePage from "../pageObjects/UserHomePage";
import BillingPlans from "../pageObjects/BillingPlansPage"
import PricingPage from "../pageObjects/PricingPage"

const userPageBillingPlan = new UserPageBillingPlan()
const signInPage = new SignInPage();
const header = new Header();
const userHomePage = new UserHomePage();
const billingPlans = new BillingPlans();
const pricingPage = new PricingPage();

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

    it('AT_048.004 | User page > Billing plans > Verify that link "One Call by Call" subscription plan" open a new page url.', function() {
      
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

    pricingPage.elements.getTitle()
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

    it('AT_048.005 | User page > Billing plans > Verify information about billing plans is available', function(){
        header.clickSignInMenuLink();
        signInPage.signIn(this.login.userProfileAJS.email, this.login.userProfileAJS.password);
        
        userHomePage.elements.getVisibleDropDownMenu().should('not.exist');
        userHomePage.clickMyAccountDropDownMenu();
        userHomePage.elements.getVisibleDropDownMenu().should('exist');
        userHomePage.clickMyServicesOnDropDownMenu();
        userHomePage.clickBillingPlanLink();
        billingPlans.elements.getAllBillingPlansTables().each(($el,i) => {
            billingPlans.elements.getAllBillingPlansTables().eq(i).find('tr').then((table) => {
                let currentTable = table.toArray().map(el => el.innerText
                    .split('\t')
                    .map(el =>{
                    if (el.includes('\n')){
                        return el.replace('\n', " ").trim()
                    } else {
                        return el.trim()
                    }
                })
                .filter(el => el.length))
                cy.log(JSON.stringify(currentTable))
                expect(currentTable).to.deep.equal(this.data.billingPlansTables[i])
            });
        });
    });

});
