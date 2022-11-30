/// <reference types="cypress" />

import Header from "../pageObjects/Header"
import SignInPage from "../pageObjects/SignInPage.js"
import PaymentPage from "../pageObjects/PaymentPage";

const header = new Header();
const signInPage = new SignInPage();
const paymentPage = new PaymentPage();

describe('Payment page test suite', () => {

    beforeEach(function (){
        cy.fixture('asiaJS').then(payment => {
            this.payment = payment;
        });
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
        signInPage.signIn(this.payment.email, this.payment.password);

        header.elements.getUserDropDownMenu()
        .should('contain.text', this.payment.textAsia);
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
});
