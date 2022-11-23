/// <reference types="cypress"/>
const inputSearchCity = 'input[placeholder = "Search city"]';
const differentWeatherBtn = '.controls span.owm-switch';
const differentWeatherPopup = 'div.pop-up-container';
const differentWeatherIcon = 'ul.icons span'; // should be used with method .contains('icon text')
const diffWeathMoreOptions = 'div.more-options';
const diffWeathTemperatureField = '[type="number"]';
const diffWeathWindStrong = '#strong';
const diffWeathEmail = 'input[type="email"]';
const diffWeathDataSourseDropArr = '.dropdown-selector svg.icon-down';
const diffWeathDataSourseDropItem = 'div.menu-item span'; // should be used with method .contains('item text')
const diffWeathAddInfo = '.owm_textarea';
const diffWeathSendBtn = '.pop-up-footer .button-round';
const metric = '#selected[style="left: 2pt;"]';


describe('GroupReporters', () => {

    beforeEach(function () {
        cy.visit('/')
        cy.fixture('reporterFix').then((data) => {
            this.data = data
        })
    });

    function enterCityOrZipCode(inputText) {
        cy.get(inputSearchCity)
            .clear()
            .type(inputText);
        return this
    };

    function submit() {
        cy.get('.search-block button').click()
    };

    it('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        const inputCity = "$$$";

        enterCityOrZipCode(inputCity);
        submit();
        cy.get('.sub.not-found')
            .should('be.visible')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).");
        cy.get('div.widget-notification')
            .should('be.visible')
            .should('have.text', `No results for ${inputCity}`);
    })

    it('AT_005.001 | Verify the website name and description', () => {
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather')
        cy.get('h2 .white-text')
            .should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way')
    })

    it.skip('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
        const zipCode = '60604';

        enterCityOrZipCode(zipCode);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', zipCode);
    });

    it('AT_024.002 | After clicking on "send" button, the form window automatically disappears', () => {
        cy.get(differentWeatherBtn).click()
        cy.get(differentWeatherPopup).should('be.be.visible')
        cy.get(differentWeatherIcon).contains('clear sky')
        cy.get(diffWeathMoreOptions).click()
        cy.get(diffWeathTemperatureField).clear({ force: true }).type('50')
        cy.get(diffWeathWindStrong).click({ force: true })
        cy.get(diffWeathEmail).type('test@mail.com')
        cy.get(diffWeathDataSourseDropArr).click()
        cy.get(diffWeathDataSourseDropItem).contains('Personal feelings').click()
        cy.get(diffWeathAddInfo).type('Not nice to lie about weather!')
        cy.get(diffWeathSendBtn).click()
        cy.get(differentWeatherPopup).should('not.exist')
    })

    it('AT_034.001 | <Header > verify "For Business" button', () => {
        cy.get('#desktop-menu :nth-child(10) > a').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://openweather.co.uk/')
    });

    it.skip('AT_001.008 | Main page > Section with search > Verify entered a City name into the Search city field', () => {
        const cityName = 'Washington DC';

        enterCityOrZipCode(cityName);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', cityName);
    });

    it('AT_001.010 | Main page > Section with search > Verify entered a city or Zip code into the Search city field', () => {
        cy.get(inputSearchCity)
            .type('Buffalo Grove')
            .click()
        cy.get('button[class="button-round dark"]')
            .click()
        cy.get('ul[class="search-dropdown-menu"]')
            .click()
        cy.url()
            .should('include', '/city/4885955')
        cy.get('div[class="current-container mobile-padding"]')
            .should('include.text', 'Buffalo Grove')
    });

    it('AT_006.003 | Sign in > Verifying successful sign in', () => {
        const emailLogin = 'hoxixe2496@lance7.com'
        const password = '1234rewQ'

        cy.get('#first-level-nav a[href="https://openweathermap.org/home/sign_in"]')
            .click()
        cy.url().should('include', 'users/sign_in')
        cy.get('.input-group > #user_email')
            .type(emailLogin)
        cy.get('.input-group > #user_password')
            .type(password)
        cy.get('#user_remember_me')
            .click()
        cy.contains('Submit')
            .click()
        cy.url().should('include', '/')
        cy.get('.panel-body')
            .should('have.text', 'Signed in successfully.')
    });

    it('AT_002.009 | Header > Clicking the logo>Verify the logo and redirected to the Main page', () => {
        const navBarGuide = '[id="desktop-menu"] [href="/guide"]';
        const headerGuide = 'h1[class="breadcrumb-title"]';
        const headerMainPage = 'h1 [class="orange-text"]'

        cy.get(navBarGuide)
            .click()
        cy.url()
            .should('include', '/guide')
        cy.get(headerGuide)
            .should('have.text', 'Guide')
        cy.get('li[class="logo"]')
            .click()
        cy.url()
            .should('include', '')
        cy.get(headerMainPage)
            .should('have.text', 'OpenWeather')
    });

    it('AT_033.012 | Header > Navigation > Verify "Maps" menu link', () => {
        cy.get('div#desktop-menu a[href*="/weathermap"]').click()
        cy.url().should('eq', 'https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=30&lon=-20&zoom=5')
    });

    it('AT_024.003 | Main page > "Different weather?" option > verify 9 weather icons are shown and their text',
        function () {
            cy.get(differentWeatherBtn).click()
            cy.get(differentWeatherIcon).should('have.length', 9)
            cy.get(differentWeatherIcon).each(($el, idx) => {
                expect($el.text()).to.include(this.data.diffWeathIcons[idx])
            })
        });

    it('AT_001.002 | Main page > Section with search > Search City > On clicking the Search button, Dropdown menu with relevant options appears', () => {
        const cityName = 'Moscow'

        enterCityOrZipCode(cityName)
        submit()
        cy.get('ul.search-dropdown-menu').should('exist')
        cy.get('ul.search-dropdown-menu li').each($el => {
            cy.wrap($el).should('contain', cityName)
        })
    })

    it('AT_002.005 | Guide > Verifying the website logo is clickable and redirects User to the Main page', () => {
        cy.get('div#desktop-menu a[href*="guide"]').click()
        cy.get('#first-level-nav > li.logo > a > img').click()
        cy.url().should('eq', 'https://openweathermap.org/')
    })

    it('AT_001.004 | Main page > Section with search > Search City > Verify weather icon and current weather in Metric system are displayed', () => {
        const cityName = 'New York'

        enterCityOrZipCode(cityName)
        submit()
        cy.get('ul.search-dropdown-menu').should('exist')
        cy.get('ul.search-dropdown-menu li:nth-child(1)').click()
        cy.url().should('include', '/city/')
        cy.get('div.current-temp .owm-weather-icon').should('exist')
        cy.get(metric).should('exist')
        cy.get('div.current-temp .heading').should('contain','°C')
    })

    it('AT_001.003 | Main page > Section with search > Search City > Verify a user is able to select a city from the search results dropdown', () => {
        const cityName = 'Tampa'

        enterCityOrZipCode(cityName)
        submit()
        cy.get('ul.search-dropdown-menu').should('exist')
        cy.get('ul.search-dropdown-menu li:nth-child(1)').click()
        cy.url().should('include', '/city/')
        cy.get('div.current-container h2').should('contain', cityName)
    })

    it('AT_022.005 | Footer > Social media > 6 social media icons on the footer', function () {
        cy.get('.social a').each(($el, index) => {
            expect($el.attr('href')).to.include(this.data.socialIcons[index])
        });
    });

    it("AT_022.008 | Footer > Social media > Verify Github icon redirection", () => {
        cy.get(".social a:nth-child(6)").should("be.visible");
        cy.get(".social a:nth-child(6)").invoke('removeAttr', 'target').click({force: true})
        cy.url().should('eq', 'https://github.com/search?q=openweathermap&ref=cmdform');
    });

    it('AT_016.001 | Support > FAQ page > Verify Support button and FAQ link is clickable and redirects to the FAQ page', () => {
      cy.get('#support-dropdown').should('be.visible').click();
      cy.get('ul#support-dropdown-menu a[href="/faq"]').should('be.visible').click();
      cy.get('div.topic h1').should('have.text', 'Frequently Asked Questions');
    });
    
    it('AT_007.006 | Main page>Sign in> Create an account > "Lost your password? Click here to recover." checking.', () => {
        const email = 'test@eail.cm'

        cy.get('#desktop-menu > ul > li.user-li > a').click()
        cy.url().should('include', '/users/sign_in')
        cy.get('.pwd-lost-q.show').should('be.visible')
        cy.get('div.pwd-lost-q.show > a').click()
        cy.get('.text-muted')
            .should('have.text', 'Enter your email address and we will send you a link to reset your password.')
        cy.get('div.pwd-lost #user_email').type(email).should('be.visible')
        cy.get('div.pwd-lost [type = "submit"]').click()
        cy.url().should('eq', 'https://home.openweathermap.org/users/password')
        cy.get('div.container h3').should('have.text', 'Forgot your password?')
    });

    it('Verify if user cantnot create an account without checking reCAPTCHA', () => {
        cy.get('#first-level-nav a[href="https://openweathermap.org/home/sign_in"]')
            .click()
        cy.url().should('include', 'users/sign_in')
        cy.get('.sign-form a[href="/users/sign_up"]')
            .click()
        cy.url().should('include', 'users/sign_up')
        cy.get('#user_username')
            .type('JesSummers')
        cy.get('#user_email')
            .type('narec38376@sopulit.com')
        cy.get('#user_password')
            .type('1234rewQ')
        cy.get('#user_password_confirmation')
            .type('1234rewQ')
        cy.get('#agreement_is_age_confirmed')
            .check()
        cy.get('#agreement_is_accepted')
            .check()
        cy.get('#mailing_system')
            .check()
        cy.get('#mailing_product')
            .check()
        cy.get('#mailing_news')
            .check()
        cy.get('.help-block')
            .should('not.exist')
        cy.get('[value="Create Account"]')
            .click()
        cy.get('.help-block')
            .should('exist')
        cy.get('.help-block').invoke('text').then( text => {
            expect(text).to.eq('reCAPTCHA verification failed, please try again.')
        })
    })

    it('TC_008.011 | Main menu > Guide > verify button "Home"', () => {
        cy.get('#desktop-menu > ul > li:nth-child(1) > a').click()
        cy.url().should('include', '/guide')

        cy.get('.breadcrumb.pull-right.hidden-xs li :nth-child(1)').click()
        cy.url().should('eq', 'https://openweathermap.org/')
    });

    it('AT 051.004 | API > Verify that after clicking on the Home link on the API page the user gets redirected to the Home page.', () => {
        cy.get('#desktop-menu a[href="/api"]').click()
        cy.url().should('eq', 'https://openweathermap.org/api')
        cy.get('.breadcrumb a[href="/"]').should('contain', 'Home').click()
        cy.url().should('eq', 'https://openweathermap.org/')
    })
});
