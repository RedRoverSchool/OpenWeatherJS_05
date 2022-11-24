
/// <reference types="cypress" />

Cypress.Commands.add('login', (userName, password) => {
  cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click({force: true})
  cy.get('#user_email').type(userName).should('have.value', userName)
  cy.get('#user_password').type(password).should('have.value', password)
  cy.get('#new_user input[value="Submit"]').click({force: true})
  cy.get('.panel-green .panel-body').should('contain', 'Signed in successfully')
})

describe('group noGroup', () => {

beforeEach(function() {
  cy.fixture('noGroup').then(data => {
      this.data = data
    });
    cy.visit('/')
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

  it.skip('AT_051.002 | API > Testing Home button > Verify that after clicking on the Home link on the API page the user gets redirected to the Home page of the site.', function () {
    cy.get('#desktop-menu a[href="/api"]').click()
    cy.url().should('contain', '/api')
    cy.get('.breadcrumb a[href="/"]').should('have.text', 'Home').click()
    cy.url().should('contain', '/openweathermap.org')
    cy.contains('OpenWeather')
  })

  it('AT_043.002 | NavBar > User > My profile > Verify that NavBar has 9 options', function() {
 
    cy.login(this.data.userProfile.email, this.data.userProfile.password)

    cy.get('.clearfix #myTab li').should('have.length', 9)
    cy.get('.clearfix #myTab li').each(($el, idx) => {
      expect($el.text()).to.include(this.data.NavBar[idx])
    })
  })
  
  it.skip('AT_047.001 | User page > New Products > Check that an unauthorized user gets to the New Products...', function() {

    cy.login(this.data.userProfile.email, this.data.userProfile.password)

    cy.url().should('include', 'home.openweathermap.org/')
    cy.get('.active').should('contain.text', 'New Products')
  })

  it('AT_043.004 | NavBar > User > Verify that tab "New Products" has 3 text-block', function() {
 
    cy.login(this.data.userProfile.email, this.data.userProfile.password)

    cy.get('#myTab a[href="/"]').should('have.text', 'New Products').click()
    cy.get('.container .text-block').should('have.length', 3)
    cy.get('.container .text-block').each(($el, idx) => {
      expect($el.text()).to.include(this.data.textBlocs[idx])
    })
})

it.skip('AT_043.005 | NavBar > User > Verify that title of 3 text blocks on the home page have the same color', function() {
 
  cy.login(this.data.userProfile.email, this.data.userProfile.password)

  cy.get('.text-block .text-color ').should('have.length', 3)
  cy.get('.text-block .text-color ').each(($el, idx) => {
  cy.wrap($el).should('have.css', 'color', 'rgb(233, 110, 80)')
    })
  })

  it('AT_006.005 | Sign in > Sign in to Your Account > Verify that after the user fills in the wrong password the alert pop-up appears', function() {
 
  cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click()
  cy.get('#user_email').type(this.data.userProfile.email)
  cy.get('#user_password').type(this.data.userProfile.wrongPassword)
  cy.get('#new_user input[value="Submit"]').click()

  cy.get('.panel.panel-red .panel-body').should('have.text', 'Invalid Email or password.')
  })

  it('AT_001.012 | Main page > Section with search > Search City> The displayed city name equals the city selected in "Search city" field', function() {
      const cityForSearch = "Paris";
      const cityForSelectList = "Paris, FR";

      cy.get('.search input').type(cityForSearch)
      cy.get('.search button').click()
      cy.get('ul.search-dropdown-menu li').each(($el) => {
          if(cy.wrap($el).contains(cityForSelectList)){
              cy.wrap($el).click()
          } 
          return false;
      })

      cy.get('div.current-container')
      .contains(cityForSelectList)
      .should('be.visible')
  })
  
  it.skip('AT_048.004 | User page > Billing plans > Verify that after the user clicks on the link "One Call by Call" subscription plan" open a new page url', function() {
 
  cy.login(this.data.userProfile.email, this.data.userProfile.password)
    
  cy.get('[href="/subscriptions"]').click()
  cy.get('h3.subscribe-title > a')
    .as('linkOneCallByCall')
    .should('be.visible')
    .click()
    .url().should('include', '/price')
  cy.get('h1.breadcrumb-title').should('have.text', 'Pricing')
  })

  it('AT_028.009 | Footer > About us > Verify the button "Buy in the Marketplace" redirects to the expected page', function() {
    cy.get('a[href="/about-us"]').click()
    cy.get('a[class="btn_block orange round"][href="https://home.openweathermap.org/marketplace"]').click()
    cy.get('#custom_weather_products').should('include.text', 'Custom Weather Products')
    .should('be.visible')
    
  });
})

