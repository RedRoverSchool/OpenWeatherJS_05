class Footer {
    elements = {
        getWebsiteTermsAndConditionsLink: () => cy.get('[href$="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getTermsAndConditionsOfSaleLink: () => cy.get('[href*="conditions_of_sale"]'),
        getWidgetsLink: () => cy.get('[href="/widgets-constructor"]')
    };

        clickOnTermsAndConditionsOfSaleLink() {
            this.elements.getTermsAndConditionsOfSaleLink().invoke('removeAttr', 'target').click({force: true});
    };
    
        clickWebsiteTermsAndConditionsLink() {
            this.elements.getWebsiteTermsAndConditionsLink().invoke('removeAttr', 'target').click();
    };  

        clickWidgetsLink() {
            this.elements.getWidgetsLink().click({force: true});
        }
};

export default Footer;
