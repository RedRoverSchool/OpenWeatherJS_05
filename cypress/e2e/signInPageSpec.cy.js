/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js"
import SignInPage from "../pageObjects/SignInPage.js"

const header = new Header()
const signInPage = new SignInPage()

describe("Sign In Page Test Suit", () => {
  beforeEach(function () {
    cy.fixture('signInPage').then((data) => {
      this.data = data
    })
    cy.visit("/")
  })

  it('AT_031.001 | Sign in > Account Dropdown Menu > After cliking the "logout" button the message appears', function () {
    header.clickSignInMenuLink();
    signInPage.enterEmail(this.data.userEmail)
    signInPage.enterPassword(this.data.userPassword)
    signInPage.clickSubmitButton()
    header.clickUserDropDownMenu()
    header.clickUserLogoutLink()

    signInPage.elements.getSignOutAllert().should("have.text", this.data.signOutAllertMessage)
  })
})
