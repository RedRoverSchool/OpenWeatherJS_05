
/// <reference types="cypress" />

describe('group noGroup', () => {

it('AT_010.006 | Marketplace > Verify all orange links on the page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu [href*=market]').invoke('removeAttr', 'target').click()
    cy.get('.market-place .product h5 a').each($el => {
      cy.wrap($el).should('have.css', 'color','rgb(235, 110, 75)')
      cy.request($el.prop('href')).should(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  });

  it('AT_010.007 | Marketplace > Verify all links on the page have the same color', function() {
    cy.visit('https://openweathermap.org/')
    cy.get('div#desktop-menu a[href="https://home.openweathermap.org/marketplace"]').invoke('removeAttr','target').click()
    cy.url().should('contain','/marketplace')
    cy.get('div.market-place h5 a').each($item => {
        cy.wrap($item).should('have.css','color','rgb(235, 110, 75)')
    })
});
  
});
