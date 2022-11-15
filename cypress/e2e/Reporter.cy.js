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


describe('GroupReporters', () => {

    beforeEach(function () {
        cy.visit('https://openweathermap.org/')
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

    it('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
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
        cy.get(diffWeathTemperatureField).clear({force: true}).type('50')
        cy.get(diffWeathWindStrong).click({force: true})
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

    it('AT_001.008 | Main page > Section with search > Verify entered a City name into the Search city field', () => {
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
        const userName = 'JesSummers'
        const emailLogin = 'hoxixe2496@lance7.com'
        const password = '1234rewQ'

        cy.get('#first-level-nav a[href="https://openweathermap.org/home/sign_in"]')
            .click({force: true})
        cy.url().should('include', 'users/sign_in')
        cy.get('.input-group > #user_email')
            .type(emailLogin)
        cy.get('.input-group > #user_password')
            .type(password)
        cy.get('#user_remember_me')
            .click({force: true})
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

    it('AT_033.012 | Header > Navigation > Verify "Maps" menu link',() => {
      cy.get('div#desktop-menu a[href*="/weathermap"]').click()
      cy.url().should('eq', 'https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=30&lon=-20&zoom=5')
  })
});

