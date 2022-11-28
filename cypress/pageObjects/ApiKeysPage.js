class ApiKeysPage {
    elements = {
        getFirstApiKey: () => cy.get('tbody tr:first-child td pre')
    }
}
export default ApiKeysPage