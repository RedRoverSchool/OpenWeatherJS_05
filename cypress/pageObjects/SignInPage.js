class SignInPage {
  elements = {
    getEmailInput: () => cy.get('.input-group #user_email'),
    getPasswordInput: () => cy.get('#user_password.form-control'),
    getSubmitButton: () => cy.get('[value="Submit"]'),
    getSignOutAllert: () => cy.get('.panel-body')
  }

  enterEmail(userEmail) {
    this.elements.getEmailInput().type(userEmail)
  };

  enterPassword(userPassword) {
    this.elements.getPasswordInput().type(userPassword)
  };

  clickSubmitButton() {
    this.elements.getSubmitButton().click()
  };
}
export default SignInPage;