/// <reference types="cypress" />

import UserHomePage from "../pageObjects/UserHomePage";
import Header from "../pageObjects/Header";
import UserServicesPage from "../pageObjects/UserServicesPage";
import SignInPage from "../pageObjects/SignInPage";

const userHomePage = new UserHomePage();
const header = new Header();
const userServicesPage = new UserServicesPage();
const signInPage = new SignInPage();

describe('User Home Page suite', () => {

    beforeEach(function () {
            cy.fixture('userHomePage').then(data => {
                  this.data = data;
            });
            cy.fixture('url').then(url  => {
                this.url = url;
            });
            cy.fixture('signInPage').then(signIn  => {
                this.signIn = signIn;
            });
            cy.visit('/');
    });

    it('AT_043.005 | NavBar > User > Verify that title of 3 text blocks on the home page have the same color', function() {
      
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password)

    userHomePage.elements.getNavBarBlocks()
        .should('have.length', 3)
        
    userHomePage.elements.getNavBarBlocks()
        .each(($el, idx) => {
            cy.wrap($el).should('have.css', 'color', this.data.color)
              })

    })

    it('AT_043.004 | NavBar > User > Verify that tab "New Products" has 3 text-block', function() {
 
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password)
    
        userHomePage.elements.getNewProductsLink()
            .should('have.class', 'active')
    
        userHomePage.elements.getNavBarBlocks()
            .should('have.length', 3)
        userHomePage.elements.getNavBarBlocks()
            .each(($el, idx) => {
            expect($el.text()).to.include(this.data.textBlocs[idx])
            })
    }) 

    it('AT_043.002 | NavBar > User > My profile > Verify that NavBar has 9 options', function() {
 
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password)

        userHomePage.elements.getNavBarLink().should('have.length', 9)
        userHomePage.elements.getNavBarLink().each(($el, idx) => {
            expect($el.text()).to.include(this.data.NavBar[idx])
          })
    })

    it('AT_047.001 | User page > New Products > Check that an unauthorized user gets to the New Products page after logged in', function () {
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.loginData.email, this.data.loginData.password);

        cy.url().should('include', this.url.userHomePage)
        userHomePage.elements.getActiveElement().should('contain.text', this.data.newProductsHeading)
    })

    it('AT_047.002 | User page > Check that authorized user can get to the New Products page', function () {
        header.clickSignInMenuLink()
        signInPage.signIn(this.data.loginData.email, this.data.loginData.password)
        header.clickLogoLink()

        header.clickUserDropDownMenu()
        header.clickUserMyServicesLink()
        userServicesPage.clickNewProductsLink()

        cy.url().should('include', this.url.userHomePage)
        userHomePage.elements.getActiveElement().should('contain.text', this.data.newProductsHeading)
    })

    it('AT_032.003 | Header > Account Dropdown Menu > My Profile > Password Change > Verify successful password change', function () {
        header.clickSignInMenuLink()
        signInPage.signIn(this.signIn.userProfileBugHunters.email, this.signIn.userProfileBugHunters.password)
    
        header.clickUserDropDownMenu()
        header.clickUserDropDownMyProfileLink()
             
        cy.url().should('be.equal', this.data.myProfileURL)
        userHomePage.changePassword(this.signIn.userProfileBugHunters.password, this.signIn.userProfileBugHunters.newPassword)
        
        userHomePage.elements.getNoticeSuccessPasswordChange()
            .should('be.visible')
            .and('have.text', this.data.noticeSuccessPasswordChange)
    })

    it('AT_020.001 | Sign in > Dropdown menu > Verify dropdown menu options', function () {
        header.clickSignInMenuLink()
        signInPage.signIn(this.signIn.userProfileLtByJS.realEmail, this.signIn.userProfileLtByJS.password)
        header.clickUserDropDownMenu()

        header
            .elements.getUserDropdownMenuList()
            .should('be.visible')
            .and('have.length', this.data.accountMenu.length)
            .each(($el, i) => {
                expect($el.text().trim()).to.be.equal(this.data.accountMenu[i])
            })
    })
})
