/// <reference types="cypress"/>

describe('Group jScript_group', () => {

    it('AT_013.001 | NavBar > After clicking the Blog menu User is redirected to the Blog page', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('be.equal', 'https://openweather.co.uk/blog/category/weather');
    });

    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', () => {
        cy.visit('https://openweathermap.org/examples');
        cy.get('.logo').click();
        cy.url().should('eq', 'https://openweathermap.org/');
    });

    it('AT_013.002 | NavBar > After redirecting to the Blog page 10 posts are displayed on the first page', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.get('.post-list .post').should('have.length', 10);
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('[href*="use.pdf"]').invoke('removeAttr', 'target').click();
        cy.url().should('include','terms_and_conditions_of_use.pdf')
    });

    it('AT_017.002 | Support > "How to start" > Verify "How to start" link redirection', () => {
        cy.visit('https://openweathermap.org/')
        cy.get('#support-dropdown').click({force: true})
        cy.get('.dropdown-menu [href*="/appid"]').click({force: true})
        cy.url().should('eq', 'https://openweathermap.org/appid') 
    })

    it('AT_050.001 | Footer >Terms and conditions of sale', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('#footer-website [href*="sale"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf');
    })  
    
    it('AT_012.002 | Partners > CMS > Verify "See on the website" button', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('div#desktop-menu a[href*="examples"]').click();
        cy.get('a[href="http://drupal.org/project/olowm"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://www.drupal.org/project/olowm');
    })

    it("AT_002.003 | Header > Verifying the website's logo is clickable and redirects User to the Main page", () => {
        cy.visit('https://openweathermap.org/');
        cy.get('#desktop-menu a[href="/weathermap"]').click();
        cy.get('.logo').click();
        cy.url().should('include', 'https://openweathermap.org/');
    });

    it('AT_031.001 | Sign in > Account Dropdown Menu > After cliking the "logout" button the message appears', () => {
        cy.visit('https://openweathermap.org/')
        cy.get('li[class="user-li"] a[href$="sign_in"]').click()
        cy.get('#user_email').type('3065606@gmail.com')
        cy.get('#user_password.form-control').type('Qwerty1234')
        cy.get('[value="Submit"]').click({force: true})
        cy.get('#desktop-menu #user-dropdown .inner-user-container').click({force: true})
        cy.get('.dropdown-menu [href*="/sign_out"]').click({force: true})
        cy.get('.panel-body').should('have.text', 'You need to sign in or sign up before continuing.');
    })

    it('AT_022.001 | Footer > Verification of displayed six Social Media icons', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('.social a').should('have.length', 6).and('be.visible')
    })
    
    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu link', () => {
        cy.visit('https://openweathermap.org');
        cy.get('#desktop-menu [href$=-dashboard]').click();
        cy.url().should('include', '/weather-dashboard');
    });
    
    it('AT_008.002 | Main menu > Guide | Verify the first button "Learn more" is clickable and user will be redirected new url', () => {
        cy.visit('https://openweathermap.org');
        cy.get("#desktop-menu ul li a[href='/guide']").click()
        cy.get("ol [href='/api#current']").click()
        cy.url().should('include', '/api#current')
    })
    
     it('AT_022.002 | Footer > Ensure Facebook icon redirection', () => {
        cy.visit('https://openweathermap.org/');
        cy.get('.social a:first-child').should('be.visible');
        cy.get('.social a:first-child').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('be.equal','https://www.facebook.com/groups/270748973021342');
    });
});

