/// <reference types="cypress" />

describe('asiaJS', () => {

  beforeEach(() => {
    cy.visit('https://home.openweathermap.org/')
  });
  

  it('AT_010.002 | Marketplace > Verify link “History Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/marketplace');
    cy.get('.product-container a[href="/history_bulks/new"]:not(.button-round)').click();
    cy.url().should('include', '/history_bulks/new');
  });


  it('AT_010.003 | Marketplace > Verify link “History Forecast Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/marketplace');
    cy.get('.product a[href*="forecast"]:not(.button-round)').click();
    cy.url().should('include', '/history_forecast_bulks/new');
  });


  it('AT_010.005 | Marketplace > Verify link “Historical Weather Data by State for all ZIP codes, USA” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/marketplace');
    cy.get('.product a[href="/zip_code_data/new"]:not(.button-round)').click();
    cy.url().should('include', '/zip_code_data/new');
    
  });


  it('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', () => {
    cy.get('[href$="website_terms_and_conditions_of_use.pdf"]').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'terms_and_conditions_of_use.pdf')
  });
  
});