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

    cy.fixture('bugHunters').then(userAccMenu => {
      this.userAccMenu = userAccMenu;
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

  it('AT_007.006 | Sign in > Create an account > Verify Negative Email', function ()  {
    header.clickSignInMenuLink();
    cy.url().should('eq', this.data.signInUrlUsers)
    signInPage.elements.getTextClickHereToRecover()
      .should('be.visible')
    signInPage.clickHereToRecover() 
    signInPage.elements.getOpenTextResetPassword()
      .should('have.text', this.data.resetYourPassord)
    signInPage.elements.getFieldForEmailPasswordReset()
      .should('be.visible').type(this.data.userNegativeEmail)
    signInPage.clickBtnSendEmailResetPassword()

    cy.url().should('eq', this.data.urlUsersPassword)
    signInPage.elements.getForgotYourPassword()
    .should('have.text', this.data.textEmailNotFound)
  });

  it('AT_006.005 | Sign in > Sign in to Your Account > Verify that after the user fills in the wrong password the alert pop-up appears', function() {
    header.clickSignInMenuLink();
    cy.url().should('eq', this.data.signInUrlUsers)

    signInPage.signIn(this.data.userProfile.email, this.data.userProfile.wrongPassword)

    signInPage.elements
      .getAllert()
      .should('be.visible')
      .should('have.text', this.data.allerInvalidEmail)
    
  });

  it('AT_020.004 |Verify dropdown menu is visible and exist', function() {
    header.clickSignInMenuLink();
    cy.url().should('eq', this.data.signInUrlUsers)

    signInPage.signInWithRememberMe(
      this.data.userProfileBugHunters.email , 
      this.data.userProfileBugHunters.password
    );
    signInPage.elements.getNoticeAfterSigned().should('have.text', 'Signed in successfully.');

    header.clickUserDropDownMenu();
    header.elements
      .getUserDropDownAllMenuVisible()
      .each(($el, ind) => {expect($el.text()).to.include(this.userAccMenu.userAccountMenu[ind])})
    
      header.clickUserLogoutLink();
  });

  it('AT_054.002 | PersonalAccountName > Verify a successful Sign-out', function () {
    header.clickSignInMenuLink();
    signInPage.signIn(this.data.userEmail, this.data.userPassword);
    signInPage.elements.getNoticeAfterSigned().should('have.text', this.data.signInSuccessful);

    header.clickUserDropDownMenu();
    header.clickUserLogoutLink();
    signInPage.elements.getAllert().should('have.text', this.data.signOutAllertMessage);
  })
  
  it('AT_031.002 | Sign In > Account Dropdown Menu > Verify user is able to log out', function () {
    header.clickSignInMenuLink()
    signInPage.signIn(this.data.userProfileLtByJS.realEmail, this.data.userProfileLtByJS.password)
    signInPage.elements.getAllertMessage().should('be.visible').and('have.text', this.data.signInSuccessful)

    header.clickUserDropDownMenu()
    header.clickUserLogoutLink()
    
    signInPage.elements.getAllertMessage().should('be.visible').and('have.text', this.data.signOutAllertMessage)
  })

  it('AT_006.001 | Sign in > After successful sign in new window should display text "Signed in successfully."', function() {
    header.clickSignInMenuLink();
    cy.url().should('eq', this.data.signInUrlUsers)

    signInPage.signInWithRememberMe(this.data.userProfileBugHunters.email, this.data.userProfileBugHunters.password)
    signInPage.elements.getNoticeAfterSigned().should('have.text', 'Signed in successfully.')  
  });
});