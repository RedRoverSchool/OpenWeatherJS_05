class UserMyProfilePage {
	elements = {
		getNewPasswordImput: () => cy.get('#password_form_password'),
		getConfirmNewPassword: () => cy.get('#password_form_password_confirmation'),
		getChangePasswordBtn: () => cy.get('input[value="Change Password"]'),
		getAllertMessage: () => cy.get('.panel-body'),
	};

	clickChangePaswordBtn() {
		this.elements.getChangePasswordBtn().click()
	};

	passwordChange(newpassword) {
		this.elements.getNewPasswordImput().type(newpassword, { log: false })
		this.elements.getConfirmNewPassword().type(newpassword, { log: false })
		this.clickChangePaswordBtn()
	};
};

export default UserMyProfilePage;