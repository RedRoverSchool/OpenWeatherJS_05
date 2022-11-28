class PartnersPage {
    elements = {
        getSectionsNames: () => cy.get('#cms a'),
        getCMSNameButtons: () => cy.get('#cms a'),
        getCmsSeeOnTheWebsiteButton: () => cy.get('#cms a[href="http://drupal.org/project/olowm"]'),
        getWaypointPluginButton: () => cy.get('a[href="http://wordpress.org/plugins/waypoint-hd-weather-widget/"]')
    }

    clickCmsSeeOnTheWebsiteButton() {
        this.elements.getCmsSeeOnTheWebsiteButton().invoke('removeAttr', 'target').click();
    }
    
     clickWaypointPluginButton() {
        this.elements.getWaypointPluginButton().invoke('removeAttr', 'target').click({force: true});
    }
}

export default PartnersPage;