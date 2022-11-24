class Footer {
    elements = {
        getWebsiteTermsAndConditions: () => cy.get('[href*="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
    }

    clickAppStoreLink() {
        this.elements.getAppStoreLink().invoke('removeAttr', 'target').click({force: true})
    }
}
export default Footer;