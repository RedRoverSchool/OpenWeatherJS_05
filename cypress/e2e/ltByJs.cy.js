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
    
    it('AT_009.002 | Main menu > Marketplace verification of displayed content History bulk and it"s price', () => {

        const marketplace = '#desktop-menu a[href*="marketplace"]'
        const historyBulk = 'div:nth-child(1) > div.product-container > div:nth-child(1) > h5 > a'
        const price = 'div.price-container > div > h5.price'

        cy.visit('https://openweathermap.org/')
        cy.get(marketplace).invoke('removeAttr', 'target').click()
        cy.get(historyBulk).should('be.visible') 
        cy.get(price).should('contain', '10 USD') 

     });
    
    it('AT_031.002 | Sign In > Account Dropdown Menu > Verify user is able to log out', function () {
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu a[href="https://openweathermap.org/home/sign_in"]').click();
        cy.url().should('eq', 'https://home.openweathermap.org/users/sign_in')
        cy.get('.input-group #user_email').click().type("catia.romankova@yandex.by");
        cy.get('.input-group #user_password').click().type('123456789');
        cy.get('#new_user :nth-child(7)').click();
        cy.get('.panel-body').should('have.text', 'Signed in successfully.');
        cy.get('.inner-user-container').click();
        cy.get('#user-dropdown-menu .logout').click();
        cy.get('.panel-body').should('have.text', 'You need to sign in or sign up before continuing.');
        
    });

    it('AT_033.003 | Header > Navigation> Verify "API" menu link', function () {
        cy.visit('https://openweathermap.org/')
        cy.get('#desktop-menu a[href="/api"]').click()
        cy.url().should('eq', 'https://openweathermap.org/api')
    });


   
    it('AT_001.007 | Main page > Section with search > Verify entered a City name into the Search city field', function () {
        cy.visit('https://openweathermap.org/')
        cy.get('.search-block .search').type("Paris");
        cy.get('.search .button-round').click()
        cy.get('.page-container .search-dropdown-menu li:nth-child(1)').click();
        cy.get('div[data-v-3e6e9f12] h2').should('have.text', 'Paris, FR');
        cy.get('div[data-v-3e6e9f12] h2').contains('Paris').should('be.visible');
        cy.get('.heading').should('contain', '°C')

    });
  
    it('AT_020.001 | Sign in > Dropdown menu > Verify dropdown menu options exist', () => {

        const email = "random_user@gmail.com"
        const password = "hysty7-noktoJ-jujxuo"
        const enterEmail = '.input-group #user_email'
        const enterPassword = '#user_password'
        const signInButton ='.user-li a'
        const submitButton = 'input[value="Submit"]'

        cy.visit('https://openweathermap.org/')
        cy.get(signInButton).click()
        cy.get(enterEmail).type(email)
        cy.get(enterPassword).type(password)
        cy.get(submitButton).click()
        cy.get('.panel-body')
          .should('have.text', 'Signed in successfully.')
        cy.get('#user-dropdown').click()
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

    it('AT_018.001 | Support > Dropdown menu > Verify "FAQ" menu link', () => {
        const faq = '#support-dropdown-menu a[href="/faq"]'
    
        cy.visit('https://openweathermap.org')
        cy.get('#support-dropdown').click()
        cy.get('#support-dropdown-menu').should('be.visible')
        cy.get(faq).click()
        cy.url().should('include', '/faq')
    });

    it('AT_018.002 | Support > Dropdown menu > Verify "How to start" menu link', () => {
        const howToStart = '#support-dropdown-menu a[href="/appid"]'
       
        cy.visit('https://openweathermap.org')
        cy.get('#support-dropdown').click()
        cy.get('#support-dropdown-menu').should('be.visible')
        cy.get(howToStart).click()
        cy.url().should('include', '/appid')
    });

    it('AT_018.003 | Support > Dropdown menu > Verify "Ask a question" menu link', () => {
        const askAQuestion = '#support-dropdown-menu a[href$="/questions"]'

        cy.visit('https://openweathermap.org')
        cy.get('#support-dropdown').click()
        cy.get('#support-dropdown-menu').should('be.visible')
        cy.get(askAQuestion)
          .should('have.attr', 'target', '_blank')
          .invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://home.openweathermap.org/questions')
  
    });

    it('AT_021.002 | Footer >Verify Widgets is clickable and redirects User to the Widgets page', function () {
        cy.visit('https://openweathermap.org')
        cy.get('a[href="/widgets-constructor"]').click();
        cy.url().should('eq', 'https://openweathermap.org/widgets-constructor')
        
    });

    it('AT_033.006 | Header > Navigation>> Verify "Partners" menu link', function () {
        cy.visit('https://openweathermap.org')
        cy.get('#desktop-menu a[href="/examples"]').click();
        cy.url().should('eq', 'https://openweathermap.org/examples')
        
    });

});
