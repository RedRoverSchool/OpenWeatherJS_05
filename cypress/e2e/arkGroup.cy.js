/// <reference types="cypress" />

describe('group Ark', () => {

it('AT_010.004 | Marketplace > Verify all orange links on the page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu [href*=market]').invoke('removeAttr', 'target').click()
    cy.get('.market-place .product h5 a').each(el => {
      cy.wrap(el).should('have.css', 'color','rgb(235, 110, 75)')
      cy.request(el.prop('href')).should(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  });

  it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', () => {
    cy.visit('https://openweathermap.org/');
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]').contains('Weather data in a fast and easy-to-use way').should('be.visible')
  })
  
});