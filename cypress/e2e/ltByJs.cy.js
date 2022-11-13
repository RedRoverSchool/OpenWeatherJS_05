/// <reference types="cypress"/>

describe('Group lt_by_js', () => {
    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu item', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href$=-dashboard]').click();
        cy.url().should('include', '/weather-dashboard');
    });

    it('AT_033.002 | Header > Navigation > Verify "Guide" menu item', () => {
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu [href="/guide"]').click()
        cy.url().should('eq', 'https://openweathermap.org/guide')
    });

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page', function (){
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu a[href="/our-initiatives"]').click();
        cy.get('.logo').click()
        cy.url().should('eq', 'https://openweathermap.org/');
        
    });

    it('AT_002.002 | Pricing > Verifying the website"s logo is clickable and redirects User to the Main page', () => {

        const pricing = '#desktop-menu a[href="/price"]'
        cy.visit('https://openweathermap.org/')
        cy.get(pricing).click()
        cy.url().should('eq', 'https://openweathermap.org/price')
        cy.get('.logo > a').click()
        cy.url().should('eq', 'https://openweathermap.org/')

    });

    it('AT_009.001 | Main menu > After clicking Marketplace User is redirected to the Marketplace page', () => {
        const marketplace = '#desktop-menu a[href*="marketplace"]'

        cy.visit('https://openweathermap.org/')
        cy.get(marketplace).invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://home.openweathermap.org/marketplace')
    });

    it('AT_020.001 | Sign in > Dropdown menu > Verify dropdown menu options exist', () => {

        const email = "random_user@gmail.com"
        const password = "hysty7-noktoJ-jujxuo"
        const enterEmail = '.input-group #user_email'
        const enterPassword = '#user_password'
        const signInButton ='.user-li a'
        const submitButton = 'input[value="Submit"]'

        cy.visit('https://openweathermap.org/')
        cy.get(signInButton).click({force:true})
        cy.get(enterEmail).type(email)
        cy.get(enterPassword).type(password)
        cy.get(submitButton).click()
        cy.get('.panel-body')
          .should('have.text', 'Signed in successfully.')
        cy.get('#user-dropdown').click({force:true})
        cy.get('#user-dropdown-menu')
          .should('exist')
          .and('have.class', 'dropdown-menu dropdown-visible')
        cy.get('#user-dropdown-menu li')
          .should(($el) => {
            expect($el).to.have.length(5)
            expect($el.eq(0)).to.include.text('My services')
            expect($el.eq(1)).to.include.text('My API keys')
            expect($el.eq(2)).to.include.text('My payments')
            expect($el.eq(3)).to.include.text('My profile')
            expect($el.eq(4)).to.include.text('Logout')
        });
    });
    
});