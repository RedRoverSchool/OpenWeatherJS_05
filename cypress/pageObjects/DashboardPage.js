class DashboardPage {
    elements = {
        getWeatherDashboardTitle: () => cy.get('h1.breadcrumb-title'),
        getTryTheDashboardFirstButton: () => cy.get('.col-lg-6 .btn_like'),
        getContactUsButton: () => cy.get('p.below .btn_like')
    }

    clickTryTheDashboardFirstButton () {
        this.elements.getTryTheDashboardFirstButton().invoke('removeAttr', 'target').click()
    }

    clickContactUsButton () {
        this.elements.getContactUsButton().invoke('removeAttr', 'target').click()
    }
}
export default DashboardPage;