/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js"
import ApiKeys from "../pageObjects/ApiKeysPage.js";

const header = new Header();
const apiKeys = new ApiKeys()

describe('API keys', () => {
    
    beforeEach(function() {
        cy.fixture('apiKeysPage').then(data  => {
            this.data = data;
        });
        cy.visit('/');
    })

    it('AT_056.001 | My API keys > Managing API keys> Create new API key', function() {
        cy.login(this.data.userData1.login, this.data.userData1.password)
        header.clickUserDropDownMenu()
        header.clickMyApiKyesLink()
        cy.url().should('contain', this.data.urn)

        apiKeys.elements.getAPIkyes().should('have.length', 1)
        apiKeys.elements.getNamesAPIkeys().should('have.text', this.data.keyNames.defaultNameKey)

        apiKeys.elements.getCreateKeyField().type(this.data.keyNames.newNameKey)
        apiKeys.clickGenerateButton()

        apiKeys.elements.getNotification()      
            .should('include.text', this.data.CreatedKeyNotice.longNotice)
            .and('include.text', this.data.CreatedKeyNotice.shortNotice)
            .and('be.visible')

        apiKeys.elements.getNamesAPIkeys()
            .should('have.length', 2)
            .should('include.text', this.data.keyNames.newNameKey)

        //delete created API key       
        apiKeys.elements.getAPIkyes().each(($el) => {
            if ($el.find(apiKeys.locators.NameKeys).text() == this.data.keyNames.newNameKey) {
                cy.wrap($el).find(apiKeys.locators.DeleteKeysButton).click()
              }
            })
    })

})