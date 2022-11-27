class DashboardPage {
    elements = {
        getWeatherDashboardTitle: () => cy.get('h1.breadcrumb-title')
    }
}
export default DashboardPage;