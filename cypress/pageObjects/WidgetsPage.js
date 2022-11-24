class WidgetsPage {
    elements = {
        getWidgets: () => cy.get('[id*="container-openweathermap-widget"]')
    }
}
export default WidgetsPage;