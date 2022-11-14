/// <reference types = "cypress" />


describe('all ARK team tests', () => {


  it ('AT_030.001|Footer>Verify redirection to terms and conditions', function() {
      cy.visit('https://openweathermap.org/')
  })
  it ("clicked on the link in the footer - the expected page was opened", () => {
  cy.get('div.footer-section a[href*="Openweather_website_terms_and_conditions"]')
  .invoke("removeAttr", "target")
  .click()                  
  .url().should('include', 'website_terms_and_conditions_of_use.pdf')
})
})

describe('group Ark', () => {

    it ('AT_010.004 | Marketplace > Verify all orange links on the page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu [href*=market]').invoke('removeAttr', 'target').click()
    cy.get('.market-place .product h5 a').each(el => {
      cy.wrap(el).should('have.css', 'color','rgb(235, 110, 75)')
      cy.request(el.prop('href')).should(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  });

});


describe('ark group', () => {

  it('AT_033.005 | Header > Navigation > Guide',() => {
  cy.visit('https://openweathermap.org/')
  cy.get('div#desktop-menu a[href*="/guide"]').invoke('removeAttr', 'target').click()
  cy.url().should('include','/guide')
 
  } ) 
   })

   
   it('AT_008.006.02 | Main menu > Guide > Verify The text "OpenWeather products" is displayed.', () => {
    cy.visit('https://openweathermap.org/');
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]').contains('OpenWeather products').should('be.visible')
  })









