
/// <reference types="cypress" />

describe('group noGroup', () => {

beforeEach(function() {
  cy.fixture('noGroup').then(data => {
      this.data = data
    });
    cy.visit('https://openweathermap.org/')
})

it('AT_010.006 | Marketplace > Verify all orange links on the page', () => {
    cy.get('#desktop-menu [href*=market]').invoke('removeAttr', 'target').click()
    cy.get('.market-place .product h5 a').each($el => {
      cy.wrap($el).should('have.css', 'color','rgb(235, 110, 75)')
      cy.request($el.prop('href')).should(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  });

  it('AT_010.007 | Marketplace > Verify all links on the page have the same color', function() {
    cy.get('div#desktop-menu a[href="https://home.openweathermap.org/marketplace"]').invoke('removeAttr','target').click()
    cy.url().should('contain','/marketplace')
    cy.get('div.market-place h5 a').each($item => {
        cy.wrap($item).should('have.css','color','rgb(235, 110, 75)')
    })
});

  it('AT_051.002 | API > Testing Home button > Verify that after clicking on the Home link on the API page the user gets redirected to the Home page of the site.', function () {
    cy.get('#desktop-menu a[href="/api"]').click()
    cy.url().should('contain', '/api')
    cy.get('.breadcrumb a[href="/"]').should('have.text', 'Home').click()
    cy.url().should('contain', '/openweathermap.org')
    cy.contains('OpenWeather')
  })

  it('AT_043.002 | NavBar > User > My profile > Verify that NavBar has 9 options', function() {
    const userName = 'nadiakoluzaeva@gmail.com';
    const password = 'OpenWeatherJS_05';
    
    cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click()
    cy.get('#user_email').type(userName).should('have.value', userName)
    cy.get('#user_password').type(password).should('have.value', password)
    cy.get('#new_user input[value="Submit"]').click()
    cy.get('.clearfix #myTab li').should('have.length', 9)
    cy.get('.clearfix #myTab li').each(($el, idx) => {
      expect($el.text()).to.include(this.data.NavBar[idx])
    })
  })
  
  it('AT_047.001 | User page > New Products > Check that an unauthorized user gets to the New Products...', function() {

      cy.get('#desktop-menu').contains('Sign in').click()
      cy.get('.input-group #user_email').type('kollapsa@gmail.com')
      cy.get('.input-group #user_password').type('76543218')
      cy.get('[value="Submit"]').click()
      cy.url().should('include', 'home.openweathermap.org/')
      cy.get('.active').should('contain.text', 'New Products')
  })

  it('AT_043.004 | NavBar > User > Verify that tab "New Products" has 3 text-block', function() {
    const userName = 'nadiakoluzaeva@gmail.com';
    const password = 'OpenWeatherJS_05';
    
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click()
    cy.get('#user_email').type(userName).should('have.value', userName)
    cy.get('#user_password').type(password).should('have.value', password)
    cy.get('#new_user input[value="Submit"]').click()
      .url().should('include', 'home.openweathermap.org')
    cy.get('#myTab a[href="/"]').should('have.text', 'New Products').click()
    cy.get('.container .text-block').should('have.length', 3)
    cy.get('.container .text-block').each(($el, idx) => {
      expect($el.text()).to.include(this.data.textBlocs[idx])
    })
})
})
