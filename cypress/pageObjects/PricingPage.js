class PricingPage {
    elements = {
        getPricingTitle: ()=> cy.get('h1.breadcrumb-title'),
        getOneCallByCallLink : () => cy.get('h3.subscribe-title > a'),
        getTitle : () => cy.get('h1.breadcrumb-title'),
    }

    clickOneCallByCallLink() {
        this.elements.getOneCallByCallLink().click({force: true});
    }
}
export default PricingPage;