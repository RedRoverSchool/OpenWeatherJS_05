/// <reference types="cypress" />

describe('group Ark', () => {


  it(`AT_008.005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, () => {
    cy.visit("https://openweathermap.org/");
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.url().should("eq", "https://openweathermap.org/guide");
  }); 

 
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


    it(`AT_002.002 | Header > Verifying the website's logo is clickable and it redirects a User to the Main page`, () => {
        cy.visit('https://openweathermap.org/guide');
        cy.get('li[class="logo"]').click();
        cy.url().should('eq', 'https://openweathermap.org/')
    })
  
    it('AT_018.004 | Support > Drop down menu. Check visible link and verify URL', () => {
      const $supportMenu = [['FAQ', '/faq'], ['How to start', '/appid'], ['Ask a question','/questions']]
      cy.visit('https://openweathermap.org/')
      cy.get('#desktop-menu #support-dropdown').parent()
          .find('a').should('have.length', $supportMenu.length).each(($el, $i) => {
              let $parentLi = $el.parent().parent().parent()
              cy.wrap($parentLi).get('#support-dropdown').click().parent()
                  .contains($supportMenu[$i][0]).should('be.visible')
                  .invoke('removeAttr', 'target').click()
              cy.url().should('include', $supportMenu[$i][1])
          })
      })


    it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', () => {
      cy.visit('https://openweathermap.org/');
      cy.get('a[href="/guide"]').contains("Guide").click();
      cy.get('.wrapper').should('be.visible')
      cy.get('div[class="col-sm-12"]').contains('Weather data in a fast and easy-to-use way').should('be.visible')
    })

    it('AT_028.004 | About us, verify “Buy in the Marketplace” button', () => {
      cy.visit('https://openweathermap.org/')
      cy.get('a[href="/about-us"]').click()
      cy.get('a.round[href*="marketplace"]').click()
      cy.url().should('include', '/marketplace')
  });
  
});
