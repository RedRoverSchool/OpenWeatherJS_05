class PartnersPage {
    elements = {
        getSectionsNames: () => cy.get('#cms a'),
        getAppStoreName: () => cy.get('.app-header__title')
    }
}
export default PartnersPage;