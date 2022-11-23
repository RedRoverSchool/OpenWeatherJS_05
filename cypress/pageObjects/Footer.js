class Footer {
    elements = {
        getTermsAndConditionsOfSaleLink: () => cy.get('#[href*="conditions_of_sale"]')
    }
}
export default Footer;