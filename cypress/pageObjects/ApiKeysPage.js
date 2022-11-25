class ApiKeys {

    elements = {

        getAPIkyes: () => cy.get('.api-keys tbody tr'),
        getNamesAPIkeys: () => cy.get('td:nth-child(2)'),    
        getCreateKeyField: () => cy.get('#api_key_form_name'),
        getGenerateButton: () => cy.get('.button-round[value="Generate"]'),
        getNotification: () => cy.get('.col-md-6'),
        getRemoveKeyButton: () => cy.get('.fa-remove')
    }

    clickGenerateButton() {
        this.elements.getGenerateButton().click()
    }

    clickRemoveKeyButton() {
        this.elements.getRemoveKeyButton().click()
    }

}

export default ApiKeys