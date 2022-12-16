class UserHomePage {
    elements = {
        getNavBarBlocks: () => cy.get('.text-block .text-color '),
        getNewProductsLink : () => cy.get('#myTab > li:nth-child(1)'),
        getNavBarLink : () => cy.get('.clearfix #myTab li'),
        getActiveElement: () => cy.get('.active'),
        getBillingPlanLink: () => cy.get('[href="/subscriptions"]'),
        getPasswordInput: () => cy.get('#password_form_password'),
        getConfirmPasswordInput: () => cy.get('#password_form_password_confirmation'),
        getChangePasswordButton: () => cy.get('input[value="Change Password"]'),
        getNoticeSuccessPasswordChange: () => cy.get('.panel-green .panel-body'),
        getMyAccountDropDownMenu: () => cy.get('#user-dropdown'),
        getVisibleDropDownMenu: () => cy.get('[class= "dropdown-menu dropdown-visible"]'),
        getMyServicesOnDropDownMenu: () => cy.get('.dropdown-visible [href="/myservices"]'),
        getMyProfileTabmenu: () => cy.get('#myTab a[href="/home"]'),

    }  

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    }

    clickNewProductsLink () {
        this.elements.getNewProductsLink().click();
    }

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    }

    changePassword(password, newPassword) {
        this.elements.getPasswordInput().type(password)
        this.elements.getConfirmPasswordInput().type(newPassword)
        this.elements.getChangePasswordButton().click()
    }

    clickMyAccountDropDownMenu() {
        this.elements.getMyAccountDropDownMenu().click();
    }

    clickMyServicesOnDropDownMenu() {
        this.elements.getMyServicesOnDropDownMenu().click();
    }

    clickMyProfileTabmenu() {
		this.elements.getMyProfileTabmenu().click()
	}
}
export default UserHomePage;