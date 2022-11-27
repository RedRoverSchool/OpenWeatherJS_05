class WidgetsPage {
    elements = {
        getWidgets: () => cy.get('[id*="container-openweathermap-widget"]'),
        getPageTitle: () => cy.get('.breadcrumb-title')
    }
}

export default WidgetsPage;