class ApiKeys {

    locators = {
        NameKeys: "td:nth-child(2)",
        DeleteKeysButton: "td a i.fa-remove",
    }

    elements = {              
        getAPIkyes: () => cy.get('.api-keys tbody tr'),
        getNamesAPIkeys: () => cy.get('td:nth-child(2)'),    
        getCreateKeyField: () => cy.get('#api_key_form_name'),
        getGenerateButton: () => cy.get('.button-round[value="Generate"]'),
        getNotification: () => cy.get('.col-md-6'),  
        getFirstApiKey: () => cy.get('tbody tr:first-child td pre')
    }

    clickGenerateButton() {
        this.elements.getGenerateButton().click()
    }

}

export default ApiKeys