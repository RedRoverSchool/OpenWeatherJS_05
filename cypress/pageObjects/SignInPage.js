class SignInPage {
  elements = {
  getEmailInput: () => cy.get('.input-group #user_email'),
  getPasswordInput: () => cy.get('#user_password.form-control'),
  getSubmitButton: () => cy.get('[value="Submit"]'),
  getSignOutAllert: () => cy.get('.panel-body'),
  getClickHereToRecover: () => cy.get('div.pwd-lost-q.show > a'),
  getTextClickHereToRecover: () => cy.get('.pwd-lost-q.show'),
  getOpenTextResetPassword: () => cy.get('.text-muted'),
  getFieldForEmailPasswordReset: () => cy.get('div.pwd-lost #user_email'),
  getBtnSendEmailResetPassword: () => cy.get('div.pwd-lost [type = "submit"]'),
  getForgotYourPassword: () =>  cy.get('div.panel-body > span'),
  getAllert : () => cy.get('.panel.panel-red .panel-body'),
  getMyProfileTabmenu: () => cy.get('#myTab a[href="/home"]'),
  getNewPasswordImput: () => cy.get('#password_form_password'),
	getConfirmNewPassword: () => cy.get('#password_form_password_confirmation'),
	getChangePasswordBtn: () => cy.get('input[value="Change Password"]')
  };

  typeEnterEmail(userEmail) {
    this.elements.getEmailInput().type(userEmail)
  };

  typeEnterPassword(userPassword) {
    this.elements.getPasswordInput().type(userPassword)
  };

  clickSubmitButton() {
    this.elements.getSubmitButton().click()
  };

  signIn(email, password) {
    this.typeEnterEmail(email)
    this.typeEnterPassword(password)
    this.clickSubmitButton()
  };

  clickHereToRecover() {
   this.elements.getClickHereToRecover().click({force: true})
  };

  clickOpenHereToRecover() {
    this.elements.getOpenTextClickHereToRecover().click({force: true})
  };

  clickBtnSendEmailResetPassword() {
    this.elements.getBtnSendEmailResetPassword().click({force: true})
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
export default SignInPage;