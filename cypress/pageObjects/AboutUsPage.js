class AboutUs {
    elements = {
        getProductsDocumentationButton: () => cy.get('div.grid-container [href="/api"]'),
        getTitleOpenWhetherProducs: () => cy.get('h2[style="margin-top: 0;"]')
    }

    clickProductsDocumentationButton() {
        this.elements.getProductsDocumentationButton().click();
    }
}
export default AboutUs;