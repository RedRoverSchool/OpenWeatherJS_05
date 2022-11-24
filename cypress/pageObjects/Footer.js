class Footer {
    elements = {
        getWebsiteTermsAndConditions: () => cy.get('[href$="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
    };

    clickWebsiteTermsAndConditions() {
        this.elements.getWebsiteTermsAndConditions().invoke('removeAttr', 'target').click()
    };
}
export default Footer;