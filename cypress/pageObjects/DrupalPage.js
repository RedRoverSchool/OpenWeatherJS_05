class DrupalPage {

    elements = {
        getHeaderLocator: () => cy.get('#site-name a')
    }
}

export default DrupalPage;