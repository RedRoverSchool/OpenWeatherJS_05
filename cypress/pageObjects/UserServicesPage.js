class UserServicesPage {
    elements = {
        getNewProductsLink: () => cy.get('#myTab').contains('New Products'),
    }

    clickNewProductsLink() {
        this.elements.getNewProductsLink().click()
    }
}
export default UserServicesPage;