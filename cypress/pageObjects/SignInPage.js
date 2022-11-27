class SignInPage {
  elements = {
  getEmailInput: () => cy.get('.input-group #user_email'),
  getPasswordInput: () => cy.get('#user_password.form-control'),
  getSubmitButton: () => cy.get('[value="Submit"]'),
  getSignOutAllert: () => cy.get('.panel-body')
  }

  typeEnterEmail(userEmail) {
    this.elements.getEmailInput().type(userEmail)
  };

  typeEnterPassword(userPassword) {
    this.elements.getPasswordInput().type(userPassword)
  }

  clickSubmitButton() {
    this.elements.getSubmitButton().click()
  }

  signIn(email, password) {
    this.typeEnterEmail(email)
    this.typeEnterPassword(password)
    this.clickSubmitButton()
  }

};
export default SignInPage;