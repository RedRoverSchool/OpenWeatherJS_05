class Footer {
    elements = {
        getWebsiteTermsAndConditions: () => cy.get('[href*="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getAboutUsLink: () => cy.get('div#footer-website a[href="/about-us"]')
    }

    clickAboutUsLink() {
        this.elements.getAboutUsLink().click({force: true});
    }
}
export default Footer;