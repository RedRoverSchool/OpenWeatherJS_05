class HowToStartPage {
    elements = {
        getTitle: () => cy.get('.col-sm-7 h1'),
        getWhyOurFreeWeatherAPILink: () => cy.get('#start a[href="/technology"]')
    }

    clickWhyOurFreeWeatherAPILink() {
        this.elements.getWhyOurFreeWeatherAPILink().click()
    }
}
export default HowToStartPage;