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

    it('AT_030.001|Footer>Verify redirection to terms and conditions', function() {
        cy.visit('https://openweathermap.org/')
      
        cy.get('div.footer-section a[href*="Openweather_website_terms_and_conditions"]')
        .invoke("removeAttr", "target")
        .click()                  
         cy.url().should('include', 'website_terms_and_conditions_of_use.pdf')
    })
});
