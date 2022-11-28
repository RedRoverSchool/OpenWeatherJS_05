/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import SignInPage from "../pageObjects/SignInPage";

const header = new Header();
const signInPage = new SignInPage();

describe('SignIn test suit', () => {

  beforeEach(function() {
    cy.fixture('signInPage').then(data => {
      this.data = data;
    })
    cy.visit('/');
  });

  it('AT_031.001 | Sign in > Account Dropdown Menu > After cliking the "logout" button the message appears', function () {
    header.clickSignInMenuLink();
    signInPage.signIn(this.data.userEmail, this.data.userPassword);
  
    header.clickUserDropDownMenu();
    header.clickUserLogoutLink();

    signInPage.elements.getSignOutAllert().should('have.text', this.data.signOutAllertMessage)
  });

  it('AT_007.006 | Main page>Sign in> Create an account > "Lost your password? Click here to recover." checking.', function ()  {
    header.clickSignInMenuLink();
    cy.url().should('eq', this.data.signInUrlUsers)
    signInPage.elements.getTextClickHereToRecover().should('be.visible')
    signInPage.clickHereToRecover() 
    signInPage.elements.getOpenTextResetPassword().should('have.text', this.data.resetYourPassord)
    signInPage.elements.getFieldForEmailPasswordReset().should('be.visible').type(this.data.userNegativeEmail)
    signInPage.clickBtnSendEmailResetPassword()

    cy.url().should('eq', this.data.urlUsersPassword)
    signInPage.elements.getForgotYourPassword().should('have.text', this.data.textForgotYourPassword)
  });
});