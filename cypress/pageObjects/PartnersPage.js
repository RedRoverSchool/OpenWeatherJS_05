class PartnersPage {
    elements = {
        getCMSNameButtons: () => cy.get('#cms a'),
        getCmsSeeOnTheWebsiteButton: () => cy.get('#cms a[href="http://drupal.org/project/olowm"]')
    }

    clickCmsSeeOnTheWebsiteButton() {
        this.elements.getCmsSeeOnTheWebsiteButton().invoke('removeAttr', 'target').click();
    }
}
export default PartnersPage;