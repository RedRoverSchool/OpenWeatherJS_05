/// <reference types="cypress"/>

describe('Group jScript_group', () => {
    beforeEach(function() {
        cy.fixture('jScript_group').then(data => {
            this.data = data;
        });
        cy.visit('/');
    })

    it.skip('AT_013.001 | Blog > Weather > After clicking the Blog menu User is redirected to the Blog page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click({force: true});

        cy.url().should('be.equal', this.data.blogPageLink);
        cy.get('#blog-categories [for="weather"] a').should('have.text', this.data.blogPageWeatherFilter);
    });

    it('AT_002.001 | Header > After clicking the logo user is redirected to the home page', function () {
        cy.visit(this.data.examplesPageLink);

        cy.get('.logo').click();

        cy.url().should('eq', 'https://openweathermap.org/');
        cy.get ('h1 .orange-text ').should('have.text', this.data.mainPageText);
    });

    it.skip('AT_013.002 | Blog > Weather > After redirecting to the Blog page 10 posts are displayed on the first page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click({force: true});

        cy.get('.post-list .post').should('have.length', this.data.blogPagePostsQuantity);
    });

    it.skip('AT_030.001 | Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        cy.get('[href*="use.pdf"]').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('include','terms_and_conditions_of_use.pdf');
    });

    it('AT_017.002 | Support > "How to start" > Verify "How to start" link redirection', function () {
        cy.get('#support-dropdown').click({force: true});
        cy.get('.dropdown-menu [href*="/appid"]').click({force: true});
        cy.url().should('eq', 'https://openweathermap.org/appid');
    });

    it('AT_050.001 | Footer >Terms and conditions of sale', function () {
        cy.get('#footer-website [href*="sale"]').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf');
    }); 
    
    it('AT_012.002 | Partners > CMS > Verify "See on the website" button', function () {
        cy.get('div#desktop-menu a[href*="examples"]').as('Partners').click({force: true});

        cy.get('a[href="http://drupal.org/project/olowm"]')
          .as('SeeOnTheWebsite_Button')
          .invoke('removeAttr', 'target')
          .click();

        cy.url().should('eq', 'https://www.drupal.org/project/olowm');
    });

    it("AT_002.003 | Header > Verifying the website's logo is clickable and redirects User to the Main page", function () {
        cy.get('#desktop-menu a[href="/weathermap"]').click({force: true});
        cy.get('.logo').click();
        cy.url().should('include', 'https://openweathermap.org/');
    });

    it('AT_031.001 | Sign in > Account Dropdown Menu > After cliking the "logout" button the message appears', function () {
        cy.get('li[class="user-li"] a[href$="sign_in"]').click({force: true});
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
        cy.get('#desktop-menu [href$=-dashboard]').click({force: true});
        cy.url().should('include', '/weather-dashboard');
    });
    
    it('AT_008.002 | Main menu > Guide | Verify the first button "Learn more" is clickable and user will be redirected new url', function () {
        cy.get("#desktop-menu ul li a[href='/guide']").click({force: true});
        cy.get("ol [href='/api#current']").click();
        cy.url().should('include', '/api#current');
    });

    it('AT_025.004 | Header > Verify user will be redirected to new url "/weather-dashboard"', function () {
        let dashboard_button = '#desktop-menu > :nth-child(2) > :nth-child(3) > a'
        cy.get(dashboard_button).click({force: true});
        cy.url().should('include','weather-dashboard');
    });

    it('AT_022.002 | Footer > Ensure Facebook icon redirection', function () {
        cy.get('.social a:first-child').should('be.visible');
        cy.get('.social a:first-child').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('include','270748973021342');
    });

    it.skip('AT_012.001 | Partners > CMS > Verifying 4 buttons exist in the section', function () {
        cy.get('#desktop-menu a[href="/examples"]').click({force: true});

        cy.get('#cms a').each(($el, i) => {
            expect($el.text()).to.equal(this.data.sectionsNames[i]);
        });
    });

    it('AT_024.001 | Main page > "Different weather?" option > Verify email enter', function () {
        cy.get('#weather-widget span.owm-switch').click({force: true});
        cy.get('#dialogDesc div.more-options').click();
        cy.get('#weather-widget  input[type="email"]').clear().type('test@gmail.com');
    });
    
    it('AT_012.004 | Partners > CMS > Verify "View widget" button', function () {
        cy.get('div#desktop-menu a[href*="examples"]').as('Partners').click({force: true});

        cy.get('a[href="http://wordpress.org/extend/plugins/awesome-weather/"]')
          .as('ViewWidget_Button')
          .invoke('removeAttr', 'target')
          .click();
        
        cy.url().should('eq', 'https://wordpress.org/plugins/awesome-weather/');
    });

    it('AT_050.002 | Footer > Verify that user can be redirected to the "Terms and conditions of sale" page', function () {
        cy.get('[href*="conditions_of_sale"]').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf');
    });

    it('AT_012.005 | Partners > CMS > Verify “View plugin” button for WordPress HD Weather Widget by The Waypoint', function () {
        cy.get('#desktop-menu a[href="/examples"]').click({force: true});
        cy.get('a[href="#cms"]').click();
        cy.get('a[href="http://wordpress.org/plugins/waypoint-hd-weather-widget/"]').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('eq', 'https://wordpress.org/plugins/waypoint-hd-weather-widget/');
    });

    it('AT_012.006 | Partners > CMS > Verify “View plugin” button for WordPress WPCloudy Plugin', function () {
        cy.get('#desktop-menu a[href="/examples"]').click({force: true});
        cy.get('a[href="#cms"]').click();
        cy.get('a[href="https://wordpress.org/plugins/wp-cloudy/"]').invoke('removeAttr', 'target').click();
        cy.url().should('eq', 'https://wordpress.org/plugins/wp-cloudy/');
    });
    
    it('AT_002.014 | Header > After clicking the logo user is redirected to the main page', function () {
        cy.get('.logo').click({force: true});
        cy.url().should('eq', 'https://openweathermap.org/');
    });
    
    it('AT_045.001 | Main page > Section with 8-day forecast>See the weather forecast for 8 days', function () {
        cy.get('ul.day-list li').should('have.length', 8);
    });

    it('AT_033.007 | Header > Navigation >> Verify "Pricing" menu link', function () {
        cy.get('#desktop-menu a[href="/price"]').should('have.text','Pricing').click({force: true});
        cy.url().should('eq','https://openweathermap.org/price');
    });
    
    it('AT_022.003 | Footer > Verify Tweeter icon redirection', function () {
        cy.get('.social a:nth-child(2)').should('be.visible');
        cy.get('.social a:nth-child(2)').invoke('removeAttr', 'target').click({force: true});
        cy.url().should('be.equal','https://twitter.com/OpenWeatherMap');
    });
    
    it('AT_033.008 | Header > Navigation > “Our Initiatives” menu link', function () {
        cy.get('#desktop-menu a[href*="initiatives"]').click({force: true});
        cy.url().should('eq', 'https://openweathermap.org/our-initiatives');
    });

    it("AT_002.012 | Header > Checking the website's logo is clickable and redirects User to the Main page", function () {
        cy.get('#desktop-menu a[href="/weathermap"]').click({force: true});
        cy.get('.logo').click();
        cy.url().should('include', 'https://openweathermap.org/');
    });

    it.skip('AT_005.002 | Main page > Verify the website\'s description', function () {
        cy.get('span.white-text').should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way');
    });

    it('AT_013.005 | Blog > Weather > The Road to a New Thinking in Transport Power', function () {
        cy.get('div#desktop-menu a[href="https://openweather.co.uk/blog/category/weather"]')
          .invoke('removeAttr', 'target')
          .click({force: true});

        cy.get('h2.post__title')
          .contains('The Road to a New Thinking in Transport Power')
          .click();
          
        cy.get('h1.post-page__title').should('have.text', 'The Road to a New Thinking in Transport Power');
    });     
    
    it.skip('AT_013.003 | Blog > Weather > Verifying the first post\'s link is clickable and redirects User to the post on a new page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click({force: true});
        cy.get('.post-list .post:nth-child(1) .post__title-link').click();

        cy.url().should('include', this.data.blogPagePostLink);
        cy.get('.post-page__img').should('be.visible');
    });

    it('AT_028.006 | Footer > About us > Verify "Products Documentation" button redirects to the expected URL', function () {
        cy.get('div#footer-website a[href="/about-us"]').click({force: true});
        cy.get('div.grid-container [href="/api"]').click();
        cy.url().should('include', 'https://openweathermap.org/api');
    });

    it('AT_028.005 | Footer > About us > Verify New and Updates button', function () {
        cy.get('a[href="/about-us"]').click({force: true});
        cy.get('a.round[href*="blog"]').invoke('removeAttr', 'target').click();
        cy.url().should('include', '/blog/category/weather');
    });

    it.skip('AT_015.001 | Header > Support > Ask a question > Not checking eCAPTCHA checkbox', function () {
        cy.get('#support-dropdown').click({force: true});
        cy.get('#support-dropdown+ul > li:nth-child(3) > a').invoke('removeAttr', 'target').click({force: true});
        cy.get('.headline').should('have.text', 'Ask a question');

        cy.get('#question_form_is_user_false').check();
        cy.get('#question_form_email').type(this.data.email);
        cy.get('#question_form_subject').select('I want to discuss a purchase of OpenWeather products/subscriptions');
        cy.get('#question_form_message').type(this.data.message);
        cy.get('.btn').click();

        cy.get('.has-error').should('have.text', 'reCAPTCHA verification failed, please try again.');
    });
    
    it('AT_002.011 | Header > Clicking the logo> Verify the Main page is opened after clicking the logo.', function () {
        cy.get('#first-level-nav .logo').invoke('removeAttr', 'target').click({force: true});

        cy.url().should('eq', 'https://openweathermap.org/');
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather');
    });
    
    it('AT_033.009 | Header > Navigation > Support > "How to start" menu link', function () {
        cy.get('#support-dropdown').click({force: true});
        cy.get('#support-dropdown-menu').should('be.visible');
        cy.get('#support-dropdown-menu a[href="/appid"]').click();

        cy.url().should('eq', 'https://openweathermap.org/appid');
        cy.get('head title').should('include.text', 'How to start to work with Openweather API');
    });

    it('AT_033.014 | Header > Navigation > Support > "FAQ" menu link', function () {
        cy.get('#support-dropdown').click({force: true});
        cy.get('#support-dropdown-menu').should('be.visible');
        cy.get('#support-dropdown-menu a[href="/faq"]').click();

        cy.url().should('eq', 'https://openweathermap.org/faq');
        cy.get('head title').should('include.text', 'Frequently Asked Questions');
    });

    it('AT_002.010 | Header > Clicking the logo > Verify that the logo is clickable', function () {
        cy.get('li.logo').click({force: true});
    
        cy.url().should('include', 'https://openweathermap.org/');
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather');
    });

    it('AT_033.015 | Header > Navigation > Support > "Ask a question" menu link', function () {
        cy.get('#support-dropdown').click({force: true});
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
        cy.get('#desktop-menu a[href="/examples"]').click({force: true});
        cy.get('.breadcrumb-title').should('have.text', 'Partners and solutions');

        cy.get('#cms a').should((a) => {
            expect(a).to.have.length(4)});
    });

    it('AT_025.005 | Header > Verify user will be redirected to new url "users/sign"', () => {
        cy.get('#desktop-menu > :nth-child(2) > :nth-child(3) > a').click({force: true})
        cy.get('.col-lg-6 > .row > p > .btn_like').invoke('removeAttr','target').click({force: true})
        
        cy.url().should('include','/users/sign_in')
        cy.get('.new_user > :nth-child(3) > #user_email').type('If_you_see this_text _ode_runs_good!!!')
    });
        
    it('AT_025.002 | Main menu > Dashboard > After clicking the first "Try the Dashboard" button not authorized User is redirected to Sign in page', function () {
        cy.get('#user-dropdown').should('not.exist');
        cy.get('#desktop-menu [href="/weather-dashboard"]').click({force: true});
        cy.get('.breadcrumb-title').should('be.visible').and('include.text','Weather dashboard');
        cy.get('.btn_like.btn-orange.owm-block-mainpage__btn').eq(0).contains('Try the Dashboard').invoke('removeAttr','target').click();
        cy.url().should('include','/users/sign_in');
        cy.get('.sign-form').should('exist');
    });

    it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
        cy.get('#desktop-menu a[href="https://openweather.co.uk"]').invoke('removeAttr','target').click({force: true});

        cy.url().should('eq', 'https://openweather.co.uk/');
        cy.get('h1').should('include.text','for business');
    });

    it('AT_044.002 | Footer > PopUps > Manage cookies', function () {
        cy.get('#stick-footer-panel a').should('be.visible');
        cy.get('#stick-footer-panel a').should('include.text', 'Manage cookies');
        cy.get('#stick-footer-panel a').click();
        
        cy.url().should('eq', 'https://openweathermap.org/cookies-settings');
        cy.get('head title').should('include.text', 'Cookies settings');
    });
            
    it('AT_002.007 | Header > Verify the website logo is clickable and the user is redirected to the Main Page', function () {
        cy.visit('/guide');
        
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

    it('AT_013.006 | Blog > Weather > Verify that after clicking the Blog menu a user is redirected to the blog page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click({force: true});
        
        cy.get('#blog-categories [for="weather"] a').should('have.text', this.data.blogPageWeatherFilter);
    });

    it('AT_025.003 | Dashboard > Verify that "Contact Us" button redirects the user to "Ask a question" page', function () {
        cy.get('#desktop-menu [href="/weather-dashboard"]').click({force: true});
        cy.title().should('eq','Weather dashboard - OpenWeatherMap');

        cy.get('.below > .btn_like').invoke('removeAttr','target').click();
        cy.url().should('include', "/questions");

        cy.title().should('eq', 'Members');
    });

    it('AT_013.007 | Blog > Weather > Verify that after landing on the Blog page 10 posts displayed on the first page', function () {
        cy.get('#desktop-menu [href*="blog"]').invoke('removeAttr', 'target').click({force: true});

        cy.get('#blog-categories [for="weather"] a').should('have.text', this.data.blogPageWeatherFilter);
        cy.get('.post-list .post').should('have.length', 10);
    });

    it('AT_038.002 | For business page > About us', function () {
        cy.get('#desktop-menu a[href="https://openweather.co.uk"]').invoke('removeAttr','target').click({force: true});
    
        cy.get('a.btn_block[href="#main_about"]').click({force: true});
    
        cy.url().should('eq', 'https://openweather.co.uk/#main_about');
        cy.get('h2[style="margin-top: 0;"]').should('include.text', 'OpenWeather products are all');
    });

    it('AT_038.003 | For business page > Our Products', function () {
        cy.get('#desktop-menu a[href="https://openweather.co.uk"]').invoke('removeAttr','target').click({force: true});
    
        cy.get('[href="#main_products"]').invoke('removeAttr', 'target').click({force: true});
        
        cy.url().should('eq', 'https://openweather.co.uk/#main_products');
        cy.get('#main_products .section h2').should('include.text', 'OUR PRODUCTS')
    });

    it.skip('AT_027.004 | Maps > Section with the scale > The scale\'s name matches the label\'s name after selecting "Pressure"', function () {
        cy.get('#desktop-menu [href="/weathermap"]').click({force: true});
        cy.get('[for="Pressure"]').click();

        cy.get('.scale-details > :first-child').should('contain.text', this.data.mapsPagePressureLabel);
    });
    
    it('AT_048.002 | User page > Billing plans > Verify billing plans information', function () {
        cy.get('#desktop-menu .user-li a').click({force: true});
        cy.get('.input-group #user_email').type('3065606@gmail.com');
        cy.get('.input-group #user_password').type('Qwerty1234');
        cy.get('#new_user [value="Submit"]').click();
        cy.get('#user-dropdown .inner-user-container').click();
        cy.get('#user-dropdown-menu a[href="/myservices"]').click();
        cy.get('.row a[href="/subscriptions"]').click();

        cy.url().should('eq', 'https://home.openweathermap.org/subscriptions');
        cy.get('.subscribe-title a').should('include.text', 'subscription plan'); 
        cy.get('.container a[href*="/price#current"]').should('have.text', 'Professional collections');
    });    

    it('AT_010.002 | Marketplace > Verify the link "History Bulk” on the page', () => {
        cy.get('#desktop-menu [href$="marketplace"]').invoke('removeAttr', 'target').click({force: true});
        cy.get('.product-container a[href="/history_bulks/new"]:not(.button-round)').click();
        
        cy.url().should('include', '/history_bulks/new');
        cy.get('.page-content-bulk h4.heading').should('have.text', 'Create New History Bulk')
    });

    it('AC_010.011 |  Marketplace > Verify that all links on the page have the same color', function () {
        cy.get('#desktop-menu [href*="marketplace"]').invoke('removeAttr', 'target').click({force: true});

        cy.get('.market-place a[href]:not(.button-round)').each(($el) => {
            cy.wrap($el).should('have.css', 'color', 'rgb(235, 110, 75)');
        });
    });

    it('AT_025.006 | Header > Verify user will be redirected to new url "questions"', function ()  {
        let dashboard_button = '#desktop-menu > :nth-child(2) > :nth-child(3) > a';
        let contact_us_button = '.below > .btn_like';
        let email_field = '#question_form_email';

        cy.get(dashboard_button).click({force: true});
        cy.get(contact_us_button).invoke('removeAttr','target').click();

        cy.url().should('include','/questions');
        cy.get(email_field).type('Checking_that_the_page_is_not_empty.');
    });

    it('AT_045.006 | Main page > Section with 8-day forecast > Verifying the weather forecast for 8 days is displayed in the section', function () {
        cy.get('.day-list li').should('have.length', this.data.dayListLength);
    });

    it('AT_045.007 | Main page > Section with 8-day forecast > Verifying the first displayed day in the section matches today\'s date', function () {
        const date = new Date().toUTCString().split(' ');
        const correctDate = []; 
        correctDate.push(date[0], date[2], date[1]);
        const todaysDate = correctDate.join(' ');

        cy.visit('/');

        cy.get('.day-list li:first-child > span').should('have.text', todaysDate);
    });

    it('AT_028.002 | <Footer> About us, Verify "Contact us" button redirects user to "Questions" page', function () {
        cy.get('a[href="/about-us"]').click({force: true});
        cy.get('.about-us :nth-child(9) [href="https://home.openweathermap.org/questions"]')
          .invoke('removeAttr','target')
          .click();

        cy.url().should('include', this.data.questionsPageEndPoint);
        cy.get('.headline').should('have.text', this.data.questionsPageHeader);    
 });
        
    it('AT_041.002 | Header > User > My API keys > Verify that user can navigate to api keys page and see alert info message', function () {
        cy.get('.user-li a').click({force: true});
        cy.get('[class*="string email optional "]').type(this.data.loginUserEmail);
        cy.get('[name="user[password]"]').type(this.data.loginUserPassword);
        cy.get('[value="Submit"]').click();
        cy.get('.inner-user-container').click();
        cy.get('#user-dropdown-menu li:nth-child(2)').click();

        cy.url().should('eq', 'https://home.openweathermap.org/api_keys');
        cy.get('.alert-info').should('have.text', '\nYou can generate as many API keys as needed for your subscription. We accumulate the total load from all of them.\n');
    });
    
    it('AT_021.003 | Footer > Widgets > Verify there are 9 widgets on the page', function () {
        cy.get('[href="/widgets-constructor"]').click({force: true});
        
        cy.get('[id*="container-openweathermap-widget"]').should('have.length', 9)
          .and('be.visible');
    });

    it('AT_018.009 | Support > Verify Drop Down menu', function() {
        cy.get('#support-dropdown').as('Support').click({force: true});

        cy.get('#support-dropdown-menu li').as('Support_Dropdown').should('be.visible');
        cy.get('@Support_Dropdown').should('have.length', 3);
        cy.get('@Support_Dropdown').each(($el, idx) => {
            expect($el.text()).to.be.equal(this.data.supportDropdown[idx]);
        });
    });
 
    it('AC_021.004 | Footer > Widgets > The widget code is visible', function () {
        cy.get('#desktop-menu li:nth-child(11) a').click({force: true});
        cy.get('.sign-form > form').within(($form) => {
            cy.get('#user_email').type(this.data.loginUserEmail);
            cy.get('#user_password').type(this.data.loginUserPassword);
            cy.root().submit();
        });
        cy.get('.inner-user-container').click();
        cy.get('.user-li li:nth-child(2) a').click();
        cy.get('td > pre').then(($myAPI) => {
            return $myAPI.text();
        }).as('myAPI');
        cy.get('.footer-website ul > :nth-child(5) > a').click();

        cy.get('@myAPI').then($api => {
            cy.get('#api-key').type($api);
        });
        cy.get('#widget-1-left-brown').click();
        cy.get('#popup-title').should('not.have.text', 'Important! You need to');

        cy.get('#popup-title').should('have.text', 'Get a code for posting a weather forecast widget on your site.');
    });

    it('AT_014.003 | Support > Ask a question>Verify if the "Ask the question" page opens', () => {
        cy.get('#support-dropdown').contains('Support').click({force: true});
        cy.get('#support-dropdown-menu a[href$="/questions"]')
        .contains('Ask a question')
        .invoke('removeAttr', 'target')
        .click();

        cy.url().should('include', '/questions')
        cy.title().should('eq', 'Members');
    });  

    it('AT_014.004 | Support > Ask a question> An error message of the reCAPCHA', () => {
        cy.visit('https://home.openweathermap.org/questions')
        cy.get('#question_form_is_user_false').check().should('be.checked')
        cy.get('#question_form_email').type('ATforAll@gmail.com')
        cy.get('#question_form_subject').select('I want to discuss a purchase of OpenWeather products/subscriptions')
        cy.get('#question_form_message').type('Ask me a question')
        cy.get('input[name="commit"]').click()

        cy.get('.help-block')
        .contains('reCAPTCHA verification failed, please try again.')
        .should('be.visible')
    });

    it('AT_024.001 | Main page > "Different weather?" option > Verify email enter', function () {
        cy.get('#weather-widget span.owm-switch').click({force: true});
        cy.get('#dialogDesc div.more-options').click();

        cy.get('#weather-widget  input[type="email"]').clear().type(this.data.email);
        cy.get('#weather-widget  input[type="email"]').should('have.value',this.data.email);
    });
});