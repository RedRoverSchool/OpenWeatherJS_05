class ApiPage {
    elements = {
        getWeatherApiTitle: () => cy.get('h1.breadcrumb-title')
    }
}

export default ApiPage;