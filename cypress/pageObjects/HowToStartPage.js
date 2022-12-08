class HowToStartPage {
    elements = {
        getTitle: () => cy.get('.col-sm-7 h1'),
        getWhyOurFreeWeatherAPILink: () => cy.get('#start a[href="/technology"]'),
        apiCareRecommendationsLink: () => cy.get('li a[href ="#apicare"]'),
        apiCareRecommendationsTitle: () => cy.get('#apicare h3')
    }

    clickWhyOurFreeWeatherAPILink() {
        this.elements.getWhyOurFreeWeatherAPILink().click()
    }

    clickApiCareRecommendationsLink() {
        this.elements.apiCareRecommendationsLink().click();
    }
}
export default HowToStartPage;