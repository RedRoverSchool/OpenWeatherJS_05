class UserPageBillingPlan {
    elements = {
        
        getOneCallByCallLink : () => cy.get('h3.subscribe-title > a'),
        getTitle : () => cy.get('h1.breadcrumb-title'),
    }

    clickOneCallByCallLink() {
        this.elements.getOneCallByCallLink().click();
    }
}
export default UserPageBillingPlan;