class PartnersPage {
    elements = {
        getCMSNameButtons: () => cy.get('#cms a'),
        getCmsSeeOnTheWebsiteButton: () => cy.get('#cms a[href="http://drupal.org/project/olowm"]'),
        getCmsViewWidgetButton: () => cy.get('#cms a[href="http://wordpress.org/extend/plugins/awesome-weather/"]')
    }

    clickCmsSeeOnTheWebsiteButton() {
        this.elements.getCmsSeeOnTheWebsiteButton().invoke('removeAttr', 'target').click();
    }

    clickCmsViewWidgetButton() {
        this.elements.getCmsViewWidgetButton().invoke('removeAttr', 'target').click();
    }
}
export default PartnersPage;