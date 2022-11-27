class AboutUs {
    elements = {
        getProductsDocumentationButton: () => cy.get('div.grid-container [href="/api"]'),
        getBuyMarketplaceButton : () => cy.get('div.grid-container a[href$="/marketplace"]')
    }

    clickProductsDocumentationButton() {
        this.elements.getProductsDocumentationButton().click();
    }

    clickBuyMarketplaceButton() {
        this.elements.getBuyMarketplaceButton().click();
    }    
}
export default AboutUs;