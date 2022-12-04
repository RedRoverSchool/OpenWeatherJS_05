/// <reference types="cypress" />

import Header from "../pageObjects/Header"
import SignInPage from "../pageObjects/SignInPage.js"
import PaymentPage from "../pageObjects/PaymentPage";

const header = new Header();
const signInPage = new SignInPage();
const paymentPage = new PaymentPage();

describe('Payment page test suite', () => {

    beforeEach(function (){
        cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('signInPage').then(userProfile => {
            this.userProfile = userProfile;    
        })
        cy.fixture('paymentsPage').then(paymentsTable => {
            this.paymentsTable = paymentsTable;
        })
        cy.visit('/');
});

    it('AT_042.005 | User page >My payments>Verify that text displays on the page', function () {
        header.clickSignInMenuLink();
        signInPage.signIn(this.userProfile.userEmail, this.userProfile.userPassword);

        header.clickUserDropDownMenu();
        header.clickPaymentMenuLink();
        cy.url().should('include', this.url.urlPayment);
    });

    it('AT_042.004 | User page > My payments > text on the page', function () {
        header.clickSignInMenuLink();
        signInPage.signIn(this.userProfile.userProfileLtByJS.realEmail, this.userProfile.userProfileLtByJS.password);
        header.elements.getUserDropDownMenu();
        header.clickUserDropDownMenu();
        header.clickPaymentMenuLink();
        cy.url().should('contain', this.url.urlPayment)
        paymentPage.elements.getColomnText().should("have.length", 4)
        paymentPage.elements.getColomnText().each(($el, idx) => {
          expect($el.text()).to.include(this.paymentsTable.paymentsTable[idx])
        }); 
        paymentPage.elements.getColomnText().eq(0).should('contain', this.paymentsTable.paymentsTable[0])
        paymentPage.elements.getColomnText().eq(1).should('contain', this.paymentsTable.paymentsTable[1])
        paymentPage.elements.getColomnText().eq(2).should('contain', this.paymentsTable.paymentsTable[2])
      });

      it('AT_042.002 | User page >My payments>Verify that text displayed on the page', function () {
        header.clickSignInMenuLink()
        signInPage.signIn(this.userProfile.userProfileLtByJS.realEmail, this.userProfile.userProfileLtByJS.password)
        signInPage.elements.getSignOutAllert().should('be.visible').and('have.text', this.userProfile.signInSuccessful)
        header.clickUserDropDownMenu()
        header.clickPaymentMenuLink()

        paymentPage.elements.getColomnText().should('have.length', 4).each(($el, i) => {
            expect($el.text()).to.include(this.paymentsTable.paymentsTable[i])
        })       
    })
});
