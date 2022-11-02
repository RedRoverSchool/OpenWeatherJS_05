/// <reference types="Cypress" />


describe('tabs test', () => {

    it('verify user can navigate to Tabs page', () => {
        cy.visit('https://demoqa.com/');
        cy.get('div.card-body h5').contains('Elements').click();
        cy.get('div.element-group div.header-text').contains('Widgets').click();
        cy.get('ul.menu-list li#item-5').contains('Tabs').click();
        cy.get('div.main-header').should('be.visible').and('have.text', 'Tabs');
        cy.get('#demo-tab-origin').as('tabOrigin').should('have.attr', 'aria-selected', 'false');
        cy.get('@tabOrigin')
            .click()
            .should('have.attr', 'aria-selected', 'true')
            .and('have.class', 'active');
        cy.get('#demo-tab-what').should('not.have.class', 'active')
        cy.get('#demo-tab-more').should('have.class', 'disabled');
    })
})

