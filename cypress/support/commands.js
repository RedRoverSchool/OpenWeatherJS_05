// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login_asiaJS', (email, password) => { 
    const buttonSignIn = '.user-li a';
    const userEmail = '.input-group input#user_email';
    const userPassword = '.input-group input#user_password';
    const submitButton = 'input[value="Submit"]';

    cy.get(buttonSignIn).click({force: true});
    cy.get(userEmail).type(email);
    cy.get(userPassword).type(password).should('be.visible');
    cy.get(submitButton).click({force: true});
});

Cypress.Commands.add('loginNoGroup', (userName, password) => {
    cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click({force: true})
    cy.get('#user_email').type(userName).should('have.value', userName)
    cy.get('#user_password').type(password).should('have.value', password)
    cy.get('#new_user input[value="Submit"]').click({force: true})
    cy.get('.panel-green .panel-body').should('contain', 'Signed in successfully')
  })

  Cypress.Commands.add('login', (email, password) => {
    cy.get('.user-li a[href*=sign_in]').click({force: true})
    cy.get('.input-group #user_email').type(email)
    cy.get('.input-group #user_password').type(password)
    cy.get('input[value="Submit"]').click({force: true})
  })

  Cypress.Commands.add('copyData', (cyVariable, locator) => {
    locator.then(($el) => {
        let info = $el.text();
        return cy.wrap(info).as(cyVariable);
    });
  });

  Cypress.Commands.add('pasteDataInInputField', (cyVariable, locator) => {
    cy.get(cyVariable).then($el => {
      locator.type($el);
    });
  });