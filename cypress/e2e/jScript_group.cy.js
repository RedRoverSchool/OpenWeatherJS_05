/// <reference types="cypress"/>

describe('Group jScript_group', () => {
    beforeEach(function() {
        cy.fixture('jScript_group').then(data => {
            this.data = data;
        });
        cy.visit('https://openweathermap.org');
    })

    it('AT_013.001 | Blog > Weather > After clicking the Blog menu User is redirected to the Blog page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();

        cy.url().should('be.equal', this.data.blogPageLink);
        cy.get('#blog-categories [for="weather"] a').should('have.text', this.data.blogPageWeatherFilter);
    });

    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', function () {
        cy.get('.logo').click();
        cy.url().should('eq', 'https://openweathermap.org/');
    });

    it('AT_013.002 | Blog > Weather > After redirecting to the Blog page 10 posts are displayed on the first page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();

        cy.get('.post-list .post').should('have.length', this.data.blogPagePostsQuantity);
    });

    it('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        cy.get('[href*="use.pdf"]').invoke('removeAttr', 'target').click();
        cy.url().should('include','terms_and_conditions_of_use.pdf');
    });

    it('AT_017.002 | Support > "How to start" > Verify "How to start" link redirection', function () {
        cy.get('#support-dropdown').click({force: true});
        cy.get('.dropdown-menu [href*="/appid"]').click({force: true});
        cy.url().should('eq', 'https://openweathermap.org/appid');
    });

    it('AT_050.001 | Footer >Terms and conditions of sale', function () {
        cy.get('#footer-website [href*="sale"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf');
    }); 
    
    it('AT_012.002 | Partners > CMS > Verify "See on the website" button', function () {
        cy.get('div#desktop-menu a[href*="examples"]').click();

        cy.get('a[href="http://drupal.org/project/olowm"]')
          .invoke('removeAttr', 'target')
          .click();

        cy.url().should('eq', 'https://www.drupal.org/project/olowm');
    });

    it("AT_002.003 | Header > Verifying the website's logo is clickable and redirects User to the Main page", function () {
        cy.get('#desktop-menu a[href="/weathermap"]').click();
        cy.get('.logo').click();
        cy.url().should('include', 'https://openweathermap.org/');
    });

    it('AT_031.001 | Sign in > Account Dropdown Menu > After cliking the "logout" button the message appears', function () {
        cy.get('li[class="user-li"] a[href$="sign_in"]').click();
        cy.get('#user_email').type('3065606@gmail.com');
        cy.get('#user_password.form-control').type('Qwerty1234');
        cy.get('[value="Submit"]').click({force: true});
        cy.get('#desktop-menu #user-dropdown .inner-user-container').click({force: true});
        cy.get('.dropdown-menu [href*="/sign_out"]').click({force: true});
        cy.get('.panel-body').should('have.text', 'You need to sign in or sign up before continuing.');
    });

    it('AT_022.001 | Footer > Verification of displayed six Social Media icons', function () {
        cy.get('.social a').should('have.length', 6).and('be.visible');
    });
    
    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu link', function () {
        cy.get('#desktop-menu [href$=-dashboard]').click();
        cy.url().should('include', '/weather-dashboard');
    });
    
    it('AT_008.002 | Main menu > Guide | Verify the first button "Learn more" is clickable and user will be redirected new url', function () {
        cy.get("#desktop-menu ul li a[href='/guide']").click();
        cy.get("ol [href='/api#current']").click();
        cy.url().should('include', '/api#current');
    });

    it('AT_025.004 | Header > Verify user will be redirected to new url "/weather-dashboard"', function () {
        let dashboard_button = '#desktop-menu > :nth-child(2) > :nth-child(3) > a'
        cy.get(dashboard_button).click();
        cy.url().should('include','weather-dashboard');
    });

    it('AT_022.002 | Footer > Ensure Facebook icon redirection', function () {
        cy.get('.social a:first-child').should('be.visible');
        cy.get('.social a:first-child').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('include','270748973021342');
    });

    it ('AT_012.001 | Partners > CMS > Verifying 4 buttons exist in the section', function () {
        cy.visit('https://openweathermap.org/examples');
        cy.get('#cms a').should(($a) => {
            expect($a).to.have.length(4);
            expect($a.eq(0)).to.contain('See on the website');
            expect($a.eq(1)).to.contain('View widget');
            expect($a.eq(2)).to.contain('View plugin');
            expect($a.eq(3)).to.contain('View plugin');
        })
    });

    it('AT_024.001 | Main page > "Different weather?" option > Verify email enter', function () {
        cy.get('#weather-widget span.owm-switch').click();
        cy.get('#dialogDesc div.more-options').click();
        cy.get('#weather-widget  input[type="email"]').clear().type('test@gmail.com');
    });
    
    it('AT_012.004 | Partners > CMS > Verify "View widget" button', function () {
        cy.get('div#desktop-menu a[href*="examples"]').click();

        cy.get('a[href="http://wordpress.org/extend/plugins/awesome-weather/"]')
          .invoke('removeAttr', 'target')
          .click();
        
        cy.url().should('eq', 'https://wordpress.org/plugins/awesome-weather/');
    });

    it('AT_050.002 | Footer > Verify that user can be redirected to the "Terms and conditions of sale" page', function () {
        cy.get('[href*="conditions_of_sale"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf');
    });

    it('AT_012.005 | Partners > CMS > Verify “View plugin” button for WordPress HD Weather Widget by The Waypoint', function () {
        cy.get('#desktop-menu a[href="/examples"]').click();
        cy.get('a[href="#cms"]').click();
        cy.get('a[href="http://wordpress.org/plugins/waypoint-hd-weather-widget/"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://wordpress.org/plugins/waypoint-hd-weather-widget/');
    });

    it('AT_012.006 | Partners > CMS > Verify “View plugin” button for WordPress WPCloudy Plugin', function () {
        cy.get('#desktop-menu a[href="/examples"]').click();
        cy.get('a[href="#cms"]').click();
        cy.get('a[href="https://wordpress.org/plugins/wp-cloudy/"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://wordpress.org/plugins/wp-cloudy/');
    });
    
    it('AT_002.014 | Header > After clicking the logo user is redirected to the main page', function () {
        cy.get('.logo').click();
        cy.url().should('eq', 'https://openweathermap.org/');
    });
    
    it('AT_045.001 | Main page > Section with 8-day forecast>See the weather forecast for 8 days', function () {
        cy.get('ul.day-list li').should('have.length', 8);
    });

    it('AT_033.007 | Header > Navigation >> Verify "Pricing" menu link', function () {
        cy.get('#desktop-menu a[href="/price"]').should('have.text','Pricing').click();
        cy.url().should('eq','https://openweathermap.org/price');
    });
    
    it('AT_022.003 | Footer > Verify Tweeter icon redirection', function () {
        cy.get('.social a:nth-child(2)').should('be.visible');
        cy.get('.social a:nth-child(2)').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('be.equal','https://twitter.com/OpenWeatherMap');
    });
    
    it('AT_033.008 | Header > Navigation > “Our Initiatives” menu link', function () {
        cy.get('#desktop-menu a[href*="initiatives"]').click();
        cy.url().should('eq', 'https://openweathermap.org/our-initiatives');
    });

    it("AT_002.012 | Header > Checking the website's logo is clickable and redirects User to the Main page", function () {
        cy.get('#desktop-menu a[href="/weathermap"]').click();
        cy.get('.logo').click();
        cy.url().should('include', 'https://openweathermap.org/');
    });

    it('AT_005.002 | Main page > Verify the website\'s description', function () {
        cy.get('span.white-text').should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way');
    });

    it('AT_013.005 | Blog > Weather > The Road to a New Thinking in Transport Power', function () {
        cy.get('div#desktop-menu a[href="https://openweather.co.uk/blog/category/weather"]')
          .invoke('removeAttr', 'target')
          .click();

        cy.get('h2.post__title')
          .contains('The Road to a New Thinking in Transport Power')
          .click();
          
        cy.get('h1.post-page__title').should('have.text', 'The Road to a New Thinking in Transport Power');
    });     
    
    it('AT_013.003 | Blog > Weather > Verifying the first post\'s link is clickable and redirects User to the post on a new page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click();
        cy.get('.post-list .post:nth-child(1) .post__title-link').click();

        cy.url().should('include', this.data.blogPagePostLink);
        cy.get('.post-page__img').should('be.visible');
    });

    it('AT_028.006 | Footer > About us > Verify "Products Documentation" button redirects to the expected URL', function () {
        cy.get('div#footer-website a[href="/about-us"]').click();
        cy.get('div.grid-container [href="/api"]').click();
        cy.url().should('include', 'https://openweathermap.org/api');
    });

    it('AT_028.005 | Footer > About us > Verify New and Updates button', function () {
        cy.get('a[href="/about-us"]').click();
        cy.get('a.round[href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/blog/category/weather');
    });

    it('AT_015.001 | Header > Support > Ask a question > Not checking eCAPTCHA checkbox', function () {
        cy.get('#support-dropdown').click();
        cy.get('#support-dropdown+ul > li:nth-child(3) > a').invoke('removeAttr', 'target').click();
        cy.get('.headline').should('have.text', 'Ask a question');

        cy.get('#question_form_is_user_false').check();
        cy.get('#question_form_email').type(this.data.email);
        cy.get('#question_form_subject').select('I want to discuss a purchase of OpenWeather products/subscriptions');
        cy.get('#question_form_message').type(this.data.message);
        cy.get('.btn').click();

        cy.get('.has-error').should('have.text', 'reCAPTCHA verification failed, please try again.');
    });
    
    it('AT_002.011 | Header > Clicking the logo> Verify the Main page is opened after clicking the logo.', function () {
        cy.get('#first-level-nav .logo').invoke('removeAttr', 'target').click();

        cy.url().should('eq', 'https://openweathermap.org/');
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather');
    });
    
    it('AT_033.009 | Header > Navigation > Support > "How to start" menu link', function () {
        cy.get('#support-dropdown').click();
        cy.get('#support-dropdown-menu').should('be.visible');
        cy.get('#support-dropdown-menu a[href="/appid"]').click();

        cy.url().should('eq', 'https://openweathermap.org/appid');
        cy.get('head title').should('include.text', 'How to start to work with Openweather API');
    });

    it('AT_033.014 | Header > Navigation > Support > "FAQ" menu link', function () {
        cy.get('#support-dropdown').click();
        cy.get('#support-dropdown-menu').should('be.visible');
        cy.get('#support-dropdown-menu a[href="/faq"]').click();

        cy.url().should('eq', 'https://openweathermap.org/faq');
        cy.get('head title').should('include.text', 'Frequently Asked Questions');
    });

    it('AT_002.010 | Header > Clicking the logo > Verify that the logo is clickable', function () {
        cy.get('li.logo').click();
    
        cy.url().should('include', 'https://openweathermap.org/');
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather');
    });

    it('AT_033.015 | Header > Navigation > Support > "Ask a question" menu link', function () {
        cy.get('#support-dropdown').click();
        cy.get('#support-dropdown-menu').should('be.visible');
        cy.get('#support-dropdown-menu a[href*="/questions"]').invoke('removeAttr', 'target').click();

        cy.url().should('eq', 'https://home.openweathermap.org/questions');
        cy.get('.headline').should('have.text', 'Ask a question');
    });

    it('AT_044.001 | Footer > PopUps > Manage cookies', function () {
        cy.get('#stick-footer-panel .stick-footer-panel').should('be.visible');
        cy.get('#stick-footer-panel button').should('have.text', 'Allow all');
        cy.get('#stick-footer-panel a').should('include.text', 'Manage cookies');
    });
    
    it('AT_012.007 | Partners > CMS > Verification the number of Buttons', () => {
        cy.get('#desktop-menu a[href="/examples"]').click();
        cy.get('.breadcrumb-title').should('have.text', 'Partners and solutions');

        cy.get('#cms a').should((a) => {
            expect(a).to.have.length(4)});
    });

    it('AT_025.002 | Main menu > Dashboard > After clicking the first "Try the Dashboard" button not authorized User is redirected to Sign in page', function () {
        cy.get('#user-dropdown').should('not.exist');
        cy.get('#desktop-menu [href="/weather-dashboard"]').click({force: true});
        cy.get('.breadcrumb-title').should('be.visible').and('include.text','Weather dashboard');
        cy.get('.btn_like.btn-orange.owm-block-mainpage__btn').eq(0).contains('Try the Dashboard').invoke('removeAttr','target').click();
        cy.url().should('include','/users/sign_in');
        cy.get('.sign-form').should('exist');
    });

    it('AT_044.002 | Footer > PopUps > Manage cookies', function () {
        cy.get('#stick-footer-panel a').should('be.visible');
        cy.get('#stick-footer-panel a').should('include.text', 'Manage cookies');
        cy.get('#stick-footer-panel a').click();
        
        cy.url().should('eq', 'https://openweathermap.org/cookies-settings');
        cy.get('head title').should('include.text', 'Cookies settings');
    });
            
    it('AT_002.007 | Header > Verify the website logo is clickable and the user is redirected to the Main Page', function () {
        cy.visit('https://openweathermap.org/guide');
        
        cy.get ('nav#nav-website a[href="/"]').click();
        cy.url().should ('eq', 'https://openweathermap.org/');
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather');
    });

    it('AT_044.003 | Footer > PopUps > Manage cookies', function () {
        cy.get('#stick-footer-panel button').should('be.visible');
        cy.get('#stick-footer-panel button').should('include.text', 'Allow all');
        cy.get('#stick-footer-panel button').click();
        
        cy.get('#stick-footer-panel .stick-footer-panel').should('not.be.visible');
    });

    it('AT_025.001 | Main menu > After clicking the Dashboard menu User is redirected to the Dashboard page', function () {
        cy.get('div.section.where-to').should('exist');

        cy.get('#desktop-menu [href="/weather-dashboard"]').click();
        
        cy.url().should('include','/weather-dashboard');
        cy.get('h1.breadcrumb-title').should('be.visible').and('include.text','Weather dashboard');
    });
});