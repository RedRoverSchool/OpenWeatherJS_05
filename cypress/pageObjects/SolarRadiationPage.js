class SolarRadiationPage {

    elements = {
        getSolarRadiationLink: () => cy.get('a[href="/api/solar-radiation"]'),
        getSolarRadiationPageTitle: () => cy.get('.breadcrumb-title')
    }
}
export default SolarRadiationPage