/// <reference types="cypress" />

describe("File Upload", () => {

    before("Should navigate to File Upload Page", () => {
      cy.visit("https://the-internet.herokuapp.com");
      cy.get('a[href="/upload"]').click();
    });

    it('File uploade using selectFile', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/images/cypressLogo.png');
        cy.get('#file-submit').click();
        cy.get('div h3').should('have.text', 'File Uploaded!');
        cy.get('#uploaded-files').should('include.text', 'cypressLogo.png')
    })
});    