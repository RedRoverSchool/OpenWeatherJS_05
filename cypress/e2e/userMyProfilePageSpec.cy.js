/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import SignInPage from "../pageObjects/SignInPage";
import UserMyProfilePage from "../pageObjects/UserMyProfilePage";
import UserHomePage from "../pageObjects/UserHomePage";

const header = new Header();
const signInPage = new SignInPage();
const usermyprofile = new UserMyProfilePage();
const userhomepage = new UserHomePage();

describe('Change password test suit', () => {

	beforeEach(function () {
		cy.fixture('signInPage').then(data => {
			this.data = data;
		})
		cy.visit('/')
	})

	it('AT_032.001 | Sign in > My profile Tab menu > Verify Password Change', function () {
		header.clickSignInMenuLink()
		signInPage.signIn(this.data.userProfileLtByJS.realEmail, this.data.userProfileLtByJS.password)

		userhomepage.clickMyProfileTabmenu()
		usermyprofile.passwordChange(this.data.userProfileLtByJS.newpassword)

		usermyprofile.elements.getAllertMessage().should('have.text', this.data.messageSuccessPasswordChange)
	})
})