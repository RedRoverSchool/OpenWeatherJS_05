class UserHomePage {
    elements = {
        getNavBarBlocks: () => cy.get('.text-block .text-color '),
    }  

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    }

}
export default UserHomePage;