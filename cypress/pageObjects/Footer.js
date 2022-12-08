class Footer {
    elements = {
        getWebsiteTermsAndConditionsLink: () => cy.get('[href$="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getTermsAndConditionsOfSaleLink: () => cy.get('[href*="conditions_of_sale"]'),
        getAboutUsLink: () => cy.get('a[href*="/about-us"]'),
        getWidgetsLink: () => cy.get('[href$="/widgets-constructor"]'),
        getMediumIcon: () => cy.get('a[href="https://medium.com/@openweathermap"]'),
        getSocialMediaIconLinks: () => cy.get('.social a'),
        getFacebookLink: () => cy.get('.social a:first-child'),
        getTwitterLink: () => cy.get('.social a:nth-child(2)'),
        getGithubLink: () => cy.get('.social a:nth-child(6)'),
        getFAQLink: () => cy.get('.section-content a[href="/faq"]'),
        getFAQLink: () => cy.get('.section-content a[href="/faq"]'),
        getAllowAllCookiesBtn: () => cy.get('#stick-footer-panel button'),
        getCookiesMessageField: () => cy.get('#stick-footer-panel .stick-footer-panel'),
        getLinkedIn: () => cy.get('.social a:nth-child(3)'),
    };

    clickOnTermsAndConditionsOfSaleLink() {
        this.elements.getTermsAndConditionsOfSaleLink().invoke('removeAttr', 'target').click({ force: true })
    };

    clickAppStoreLink() {
        this.elements.getAppStoreLink().invoke('removeAttr', 'target').click({ force: true })
    };

    clickGooglePlayLink() {
        this.elements.getGooglePlayLink().invoke('removeAttr', 'target').click({ force: true })
    };

    clickWebsiteTermsAndConditionsLink() {
        this.elements.getWebsiteTermsAndConditionsLink().invoke('removeAttr', 'target').click();
    };
    clickAboutUsLink() {
        this.elements.getAboutUsLink().click({ force: true });
    };
    clickWidgetsLink() {
        this.elements.getWidgetsLink().click({ force: true });
    };

    clickTwitterLink() {
        this.elements.getTwitterLink().invoke('removeAttr', 'target').click({force: true});
    };

    clickGithubLink() {
        this.elements.getGithubLink().invoke('removeAttr', 'target').click({force: true});
    };
    
    clickMediumIcon() {
        this.elements.getMediumIcon().invoke('removeAttr', 'target').click({ force: true })
    };

    clickFacebookLink() {
        this.elements.getFacebookLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickTwitterLink() {
        this.elements.getTwitterLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickFAQLink() {
        this.elements.getFAQLink().click({ force: true });
    };

    clickAllowAllCookiesBtn() {
        this.elements.getAllowAllCookiesBtn().click({ force: true });
    };
    
    clickLinkedInk() {
        this.elements.getLinkedIn().invoke('removeAttr', 'target').click({ force: true });
    };
 
};
export default Footer;