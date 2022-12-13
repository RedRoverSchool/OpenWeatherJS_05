class UserMyprofile {
	elements = {
		getMyProfileTabmenu: () => cy.get('#myTab a[href="/home"]'),
		getNewPasswordImput: () => cy.get('#password_form_password'),
		getConfirmNewPassword: () => cy.get('#password_form_password_confirmation'),
		getChangePasswordBtn: () => cy.get('input[value="Change Password"]'),
		getAllertMessage: () => cy.get('.panel-body'),
	};

	clickMyProfileTabmenu() {
		this.elements.getMyProfileTabmenu().click()
	};

	clickChangePaswordBtn() {
		this.elements.getChangePasswordBtn().click()
	};

	passwordChange(newpassword) {
		this.clickMyProfileTabmenu()
		this.elements.getNewPasswordImput().type(newpassword, { log: false })
		this.elements.getConfirmNewPassword().type(newpassword, { log: false })
		this.clickChangePaswordBtn()
	};
};

export default UserMyprofile;