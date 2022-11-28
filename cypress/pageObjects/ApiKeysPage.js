class ApiKeys {

    locators = {
        NameKeys: "td:nth-child(2)",
        DeleteKeysButton: "td a i.fa-remove",
        EditKeyButton: ".fa-edit"
    }

    elements = {              
        getAPIkyes: () => cy.get('.api-keys tbody tr'),
        getNamesAPIkeys: () => cy.get('td:nth-child(2)'),    
        getCreateKeyField: () => cy.get('#api_key_form_name'),
        getGenerateButton: () => cy.get('.button-round[value="Generate"]'),
        getNotification: () => cy.get('.col-md-6'),  
        getEditAPIkeyField: () => cy.get('#edit_key_form_name'),
        getSaveEditKeyButton: () => cy.get('button.dark[onclick*=submit]'),
        getFirstApiKey: () => cy.get('tbody tr:first-child td pre')

    }

    clickGenerateButton() {
        this.elements.getGenerateButton().click()
    }

    clickSaveEditKeyButton() {
        this.elements.getSaveEditKeyButton().click()
    }

    actionWithKey(nameKey, actionLocator) {
        this.elements.getAPIkyes().each(($el) => {
            if($el.find(this.locators.NameKeys).text() == nameKey) {
                cy.wrap($el).find(actionLocator).click()
            }
        })
    }

}

export default ApiKeys
