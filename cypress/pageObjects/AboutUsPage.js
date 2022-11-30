class AboutUs {
    elements = {
        getProductsDocumentationButton: () => cy.get('div.grid-container [href="/api"]'),
        getBuyBySubscriptionButton: () => cy.get('a[href="https://home.openweathermap.org/subscriptions"]'),
        getBuyMarketplaceButton : () => cy.get('div.grid-container a[href$="/marketplace"]')
    }

    clickProductsDocumentationButton() {
        this.elements.getProductsDocumentationButton().click();
    }

    clickBuyBySubscriptionButton() {
        this.elements.getBuyBySubscriptionButton().click();
    }

    clickBuyMarketplaceButton() {
        this.elements.getBuyMarketplaceButton().click();
    }    
}
export default AboutUs;