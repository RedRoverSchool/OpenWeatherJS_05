/// <reference types="cypress" />

describe('group jsTeachers', () => {

  it('AT_010.001 | Marketplace > Verify all links have the same color on the page', () => {
    cy.visit('https://openweathermap.org')
    cy.get('div#desktop-menu a[href*="marketplace"]').invoke('removeAttr', 'target').click()

    cy.get('div.market-place a[href]:not(.button-round)').each(($el, index) => {
      cy.wrap($el).should('have.css', 'color', 'rgb(235, 110, 75)')
    })
  })
})
