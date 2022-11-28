/// <reference types="cypress" />

import ApiKeysPage from "../pageObjects/ApiKeysPage.js";
import Footer from "../pageObjects/Footer.js"
import Header from "../pageObjects/Header.js";
import SignInPage from "../pageObjects/SignInPage.js";
import WidgetsPage from "../pageObjects/WidgetsPage.js";

const footer = new Footer();
const widgetsPage = new WidgetsPage();
const singInPage = new SignInPage();
const header = new Header();
const apiKeysPage = new ApiKeysPage();

describe('Widgets page test suite', () => {

    beforeEach(function() {
        cy.fixture('widgetsPage').then(data => {
            this.data = data;
        });
        cy.fixture('footer').then(footer => {
            this.footer = footer;
        });

        cy.fixture('signInPage').then(signIn => {
            this.signIn = signIn;
        });

        cy.visit('/');
    });

    it('AT_021.003 | Footer > Widgets > Verify there are 9 widgets on the page', function() {
        footer.clickWidgetsLink();
        widgetsPage.elements.getWidgets().should('have.length', this.data.widgetsQuantity)
                          .and('be.visible')
    });

    it('AT_021.005 | Footer > Widgets> Verify redirect to Widgets constructor page', function() {
        cy.login(this.data.userData1.login, this.data.userData1.password)

        footer.elements.getWidgetsLink().should('include.text', this.footer.nameWidgetsLink)
        footer.clickWidgetsLink()

        cy.url().should('include', this.data.urn)
        widgetsPage.elements.getPageTitle().should('have.text', this.data.pageTitle)

    })

    it('AT_021.004 | Widgets > The widget code is visible', function () {
        header.clickSignInMenuLink();
        singInPage.signIn(this.signIn.userEmail, this.signIn.userPassword);
        header.clickUserDropDownMenu();
        header.clickUserDropDownMyApiKeysLink();
        cy.copyData("myApiKey", apiKeysPage.elements.getFirstApiKey());
        footer.clickWidgetsLink();

        cy.pasteDataInInputField("@myApiKey", widgetsPage.elements.getApiKeyInputField());
        widgetsPage.clickCodeWidgetFirstBtn();
        widgetsPage.elements.getPopupWindowTitle().should('not.have.text', this.data.popupWindowTitle.invalidTitle);

        widgetsPage.elements.getPopupWindowTitle().should('have.text', this.data.popupWindowTitle.validTitle);
    });
});