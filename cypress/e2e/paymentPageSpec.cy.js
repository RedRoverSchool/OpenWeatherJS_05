/// <reference types="cypress" />

import Header from "../pageObjects/Header"
import SignInPage from "../pageObjects/SignInPage.js"

const header = new Header();
const signInPage = new SignInPage();

describe('Payment page test suite', () => {

    beforeEach(function (){
        cy.fixture('asiaJS').then(payment => {
        this.payment = payment;
      });
        cy.fixture('url').then(url => {
        this.url = url;
    });
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
});
