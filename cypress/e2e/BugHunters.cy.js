/// <reference types="cypress"/> 

describe('groupBugHunters', () => {

    it('AT_006.001 | Main page > Sign in', function () {
        cy.visit('https://openweathermap.org/')
        cy.get('li.user-li').contains('Sign in').click({force: true})
        cy.get('#user_email')
          .should('have.attr', 'placeholder', 'Enter email')
          .type('oforostinko@gmail.com') 
        cy.get('#user_password.form-control')
          .should('have.attr', 'placeholder', 'Password')
          .type('12341234')
        cy.get('#user_remember_me').check().should('be.checked')
        cy.contains('Submit').click()
        cy.get('.panel-body').should('have.text','Signed in successfully.')
  
    })

    it ('AT_029.001 | Two icons "Download on the App store" and "Get it on Google play" are visible', function() {
        cy.visit('https://openweathermap.org/')
        cy.get('.my-5 a[href*=apple]').should('be.visible')
        cy.get('.my-5 a[href*=google]').should('be.visible')
    })

    it("AT_029.002 | Footer >Download OpenWeather App> Download on the App Store' button link", function() {
      cy.visit('https://openweathermap.org/')
      cy.get('.my-5 a[href*=apple]').invoke('removeAttr', 'target').click()
      cy.url().should('eq', 'https://apps.apple.com/gb/app/openweather/id1535923697')        
    })

    it ('AT_008.004 | Main menu > Guide | Verify the button "Subscribe to One Call by Call" is clickable and user be redirected new url', () => {
      cy.visit('https://openweathermap.org/');
      cy.get('#desktop-menu').contains('Guide').click({force: true});
      cy.get('center a[href="/price"]').click();
      cy.url().should('contain', '/price');
  })
})