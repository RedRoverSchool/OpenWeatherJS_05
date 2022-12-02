class HowToStartPage {
    elements = {
        getTitle: () => cy.get('.col-sm-7 h1'),
        apiCareRecommendationsLink: () => cy.get('li a[href ="#apicare"]'),
        apiCareRecommendationsTitle: () => cy.get('#apicare h3')
    }

    clickApiCareRecommendationsLink() {
        this.elements.apiCareRecommendationsLink().click();
    }

}

export default HowToStartPage;