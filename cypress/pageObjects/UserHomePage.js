class UserHomePage {
    elements = {
        getNavBarBlocks: () => cy.get('.text-block .text-color '),
        getNewProductsLink : () => cy.get('#myTab a[href="/"]').should('have.text', 'New Products'),
        getNavBarLink : () => cy.get('.clearfix #myTab li'),
        getActiveElement: () => cy.get('.active'),
    }  

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    }

    clickNewProductsLink () {
        this.elements.getNewProductsLink().click();
    }

}
export default UserHomePage;