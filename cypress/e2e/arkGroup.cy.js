/// <reference types = "cypress" />

describe('all ARK team tests', () => {
          
      
    it('AT_030.001|Footer>Verify redirection to terms and conditions', function() {
        cy.visit('https://openweathermap.org/')
    })
    it("clicked on the link in the footer - the expected page was opened", () => {
        cy.get('div.footer-section a[href*="Openweather_website_terms_and_conditions"]')
        .invoke("removeAttr", "target")
        .click()                  
        .url().should('include', 'website_terms_and_conditions_of_use.pdf')
    })
})