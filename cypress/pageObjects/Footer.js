class Footer {
    elements = {
        getWebsiteTermsAndConditions: () => cy.get('[href*="use.pdf"]')
    }
}
export default Footer;