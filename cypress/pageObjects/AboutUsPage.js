class AboutUs {
    elements = {
        getProductsDocumentationButton: () => cy.get('div.grid-container [href="/api"]'),
        getBuyBySubscriptionButton: () => cy.get('a[href="https://home.openweathermap.org/subscriptions"]'),
        getBuyMarketplaceButton : () => cy.get('div.grid-container a[href$="/marketplace"]'),
        getNewsAndUpdatesButton: () => cy.get('a.round[href*="blog"]'),
        getContactUsButton: () => cy.get('.about-us :nth-child(9) [href="https://home.openweathermap.org/questions"]'),
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

    clickNewsAndUpdatesButton() {
        this.elements.getNewsAndUpdatesButton().invoke('removeAttr', 'target').click();
    }

    clickContactUsButton() {
        this.elements.getContactUsButton().invoke('removeAttr', 'target').click();
    }
}
export default AboutUs;