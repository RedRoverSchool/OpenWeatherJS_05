class UserPageBillingPlan {
    elements = {
        getBillingPlanLink: () => cy.get('[href="/subscriptions"]'),
        getOneCallByCallLink : () => cy.get('h3.subscribe-title > a'),
        getTitle : () => cy.get('h1.breadcrumb-title'),
    }

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    }

    clickOneCallByCallLink() {
        this.elements.getOneCallByCallLink().click();
    }
}
export default UserPageBillingPlan;