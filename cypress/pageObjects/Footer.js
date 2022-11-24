class Footer {
    elements = {
        getWebsiteTermsAndConditionsLink: () => cy.get('[href$="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getTermsAndConditionsOfSaleLink: () => cy.get('[href*="conditions_of_sale"]')
    };

        clickOnTermsAndConditionsOfSaleLink() {
            this.elements.getTermsAndConditionsOfSaleLink().invoke('removeAttr', 'target').click({force: true});
    };
    
        clickWebsiteTermsAndConditionsLink() {
            this.elements.getWebsiteTermsAndConditionsLink().invoke('removeAttr', 'target').click();
    };  
};

export default Footer;
