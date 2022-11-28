class PartnersPage {
    elements = {
        getSectionsNames: () => cy.get('#cms a'),
        getWaypointPluginButton: () => cy.get('a[href="http://wordpress.org/plugins/waypoint-hd-weather-widget/"]')
    }

    clickWaypointPluginButton() {
        this.elements.getWaypointPluginButton().invoke('removeAttr', 'target').click({force: true});
    }
}
export default PartnersPage;