/// <reference types="cypress" />

describe('group_javascript_for_qas', () => {
    it('AT_028.001 | Footer > About us > Verify "About us" link redirects to the corresponding page', function () {
        cy.visit('https://openweathermap.org/');
    });

    it('AT_015.002 | Header > Support > Ask a question > Verify error message for an unauthorised user', function () {
        cy.visit('https://openweathermap.org/');
        cy.get("li.with-dropdown div").click();
        cy.get("ul#support-dropdown-menu a[href='https://home.openweathermap.org/questions']").invoke('removeAttr', 'target').click()
        cy.title().should('eq', 'Members');
       
        cy.get('input#question_form_is_user_true').check().should('be.checked')
        cy.get('div#prompt').should('be.visible');
        cy.get('div#prompt').should('have.text','Please enter your account email in our system - it will help us process your request faster')
        cy.get('div#prompt').should('have.class','alert-info');
        cy.get('div#prompt').should('have.css', 'background-color', 'rgba(120, 203, 191, 0.08)') 
    });
});
