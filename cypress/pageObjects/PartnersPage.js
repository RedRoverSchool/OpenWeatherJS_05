class PartnersPage {
    elements = {
        getSectionsNames: () => cy.get('#cms a'),
        getCMSNameButtons: () => cy.get('#cms a'),
        getCmsSeeOnTheWebsiteButton: () => cy.get('#cms a[href="http://drupal.org/project/olowm"]'),
        getWaypointPluginButton: () => cy.get('a[href="http://wordpress.org/plugins/waypoint-hd-weather-widget/"]'),
        getCmsViewWidgetButton: () => cy.get('a[href="http://wordpress.org/extend/plugins/awesome-weather/"]'),
        getWPCloudyPluginButton: () => cy.get('a[href="https://wordpress.org/plugins/wp-cloudy/"]')
    }

    clickCmsSeeOnTheWebsiteButton() {
        this.elements.getCmsSeeOnTheWebsiteButton().invoke('removeAttr', 'target').click();
    }
    
     clickWaypointPluginButton() {
        this.elements.getWaypointPluginButton().invoke('removeAttr', 'target').click({force: true});
    }

    clickCmsViewWidgetButton() {
        this.elements.getCmsViewWidgetButton().invoke('removeAttr', 'target').click();
    }

    clickWPCloudyPluginButton() {
        this.elements.getWPCloudyPluginButton().invoke('removeAttr', 'target').click();
    }
}  
export default PartnersPage;