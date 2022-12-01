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

        cy.fixture('apiKeysPage').then(keys => {
            this.keys = keys;
        });

        cy.visit('/');
    });

    it('AT_021.003 | Footer > Widgets > Verify there are 9 widgets on the page', function() {
        footer.clickWidgetsLink();
        widgetsPage.elements.getWidgets().should('have.length', this.data.widgetsQuantity)
                          .and('be.visible')
    });

    it('AT_021.005 | Footer > Widgets> Verify redirect to Widgets constructor page', function() {
        header.clickSignInMenuLink()
        singInPage.signIn(this.data.userData1.login, this.data.userData1.password)

        footer.elements.getWidgetsLink().should('include.text', this.footer.nameWidgetsLink)
        footer.clickWidgetsLink()

        cy.url().should('include', this.data.urn)
        widgetsPage.elements.getPageTitle().should('have.text', this.data.pageTitle)

    })

    it.only('AT_021.004 | Widgets > The widget code is visible', function () {
        header.clickSignInMenuLink();
        singInPage.signIn(this.signIn.userEmail, this.signIn.userPassword);
        header.clickUserDropDownMenu();
        header.clickUserDropDownMyApiKeysLink();
        apiKeysPage.copyApiKey(apiKeysPage.elements.getFirstApiKey());
        footer.clickWidgetsLink();

        widgetsPage.pasteCopiedApiKeyInInputField('@myApiKey');
        widgetsPage.clickCodeWidgetFirstBtn();
        widgetsPage.elements.getPopupWindowTitle().should('have.text', this.data.popupWindowTitle.validTitle);

        widgetsPage.elements.getApiInputFieldErrMessage().should('have.text', this.data.apiInputFielValidMessage)
    });

    it('AT_021.007 | Footer > Widgets> Verify popup windows with info appear after clicking "Get code" buttons', function() {
        header.clickSignInMenuLink()
        singInPage.signIn(this.data.userData1.login, this.data.userData1.password)
        header.clickUserDropDownMenu()
        header.clickMyApiKyesLink()
        cy.url().should('contain', this.keys.urn)
        apiKeysPage.elements.getCreateKeyField().type(this.keys.keyNames.newNameKey)
        apiKeysPage.clickGenerateButton()

        let codeAPIkey;
        apiKeysPage.elements.getAPIkyes().each(($el) => {
            if($el.find(apiKeysPage.locators.NameKeys).text() == this.keys.keyNames.newNameKey) {
                cy.wrap($el).find(apiKeysPage.locators.CodeKey).then(($el) => {
                    codeAPIkey = $el.text()
                })
            }
        })
        footer.clickWidgetsLink()
        widgetsPage.elements.getApiKeyInputField()
            .clear()
            .then(($el) => {
            cy.wrap($el).type(codeAPIkey)
        })

        widgetsPage.elements.getAllGetAcodeButtons().each(($el) => {
            cy.wrap($el).click({force: true})
            widgetsPage.elements.getPopupWindow().should('be.visible')
            widgetsPage.elements.getPopupWindowTitle().should('have.text', this.data.popupWindowTitle.validTitle)
            widgetsPage.elements.getCopyInBufferButton().should('be.visible').and('have.text', this.data.copyInBufferBtn)

            widgetsPage.clickClosePopupWin()       
        })

        //Delete created key
        header.clickUserDropDownMenu()
        header.clickMyApiKyesLink()
        apiKeysPage.actionWithKey(this.keys.keyNames.newNameKey, apiKeysPage.locators.DeleteKeysButton)
    })
});