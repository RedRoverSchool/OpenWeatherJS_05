/// <reference types="cypress" />

describe('asiaJS', () => {

  beforeEach(() => {
    cy.visit('https://home.openweathermap.org/')
  });

  it('AT_010.002 | Marketplace > Verify link “History Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/marketplace')
    cy.get('.product-container a[href="/history_bulks/new"]:not(.button-round)').click()
    cy.url().should('include', '/history_bulks/new')
  });

  
  
});