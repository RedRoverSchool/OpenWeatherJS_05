class Footer {
    elements = {
        getWebsiteTermsAndConditions: () => cy.get('[href*="use.pdf"]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getTermsAndConditionsOfSale: () => cy.get('[href*="conditions_of_sale"]')
    }
}
export default Footer;