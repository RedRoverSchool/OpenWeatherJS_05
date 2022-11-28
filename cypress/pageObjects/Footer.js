class Footer {
    elements = {
        getWebsiteTermsAndConditionsLink: () => cy.get('[href$="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getTermsAndConditionsOfSaleLink: () => cy.get('[href*="conditions_of_sale"]'),
        getAboutUsLink: () => cy.get('div#footer-website a[href="/about-us"]'),
        getWidgetsLink: () => cy.get('[href$="/widgets-constructor"]'),
        getMediumIcon: () => cy.get('a[href="https://medium.com/@openweathermap"]'),
        getNameOfPageMedium: () =>  cy.get('.bm.gp.gq')
    };

        clickOnTermsAndConditionsOfSaleLink() {
            this.elements.getTermsAndConditionsOfSaleLink().invoke('removeAttr', 'target').click({force: true})
    };   
     
        clickAppStoreLink() {
            this.elements.getAppStoreLink().invoke('removeAttr', 'target').click({force: true})
    };

        clickGooglePlayLink() {
        this.elements.getGooglePlayLink().invoke('removeAttr', 'target').click({force: true})
    };
    
        clickWebsiteTermsAndConditionsLink() {
            this.elements.getWebsiteTermsAndConditionsLink().invoke('removeAttr', 'target').click();
    };  
        clickAboutUsLink() {
            this.elements.getAboutUsLink().click({force: true});
    };
        clickWidgetsLink() {
            this.elements.getWidgetsLink().click({force: true});
    };

        clickMediumIcon(){
            this.elements.getMediumIcon().invoke('removeAttr', 'target').click()
    }
};
export default Footer;