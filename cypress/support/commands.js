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