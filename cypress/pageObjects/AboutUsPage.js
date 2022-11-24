class AboutUs {
    elements = {
        getProductsDocumentationButton: () => cy.get('div.grid-container [href="/api"]')
    }

    clickProductsDocumentationButton() {
        this.elements.getProductsDocumentationButton().click();
    }
}
export default AboutUs;