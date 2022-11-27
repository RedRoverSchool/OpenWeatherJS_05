/// <reference types="cypress" />

const mainMenuDesk = {
  "marketplace": "#desktop-menu a[href*='/marketplace']",
  "maps": "#desktop-menu a[href*='/weathermap']"
  }

describe('group Ark', () => {

  beforeEach(function () {
    cy.fixture('arkGroup.json').then(data => {
      this.data = data;
    });
    cy.visit('/');
   })

  it(`AT_008.005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, function () {
    cy.get('a[href="/guide"]').contains("Guide").click();

    cy.url().should("eq", "https://openweathermap.org/guide");
  });

  it.skip('AT_010.004 | Marketplace > Verify the color of all orange links', function () {
    cy.get(mainMenuDesk.marketplace).invoke('removeAttr', 'target').click()
  
    cy.get('.market-place .product h5 a')
      .each(el => {
        cy.wrap(el).should('have.css', 'color', 'rgb(235, 110, 75)')
      })
  });

  it('AT_030.001|Footer>Verify redirection to terms and conditions', function () {
    cy.get('div.footer-section a[href*="Openweather_website_terms_and_conditions"]')
      .invoke("removeAttr", "target")
      .click()

    cy.url().should('include', 'website_terms_and_conditions_of_use.pdf')
  })

  it(`AT_002.002 | Header > Verifying the website's logo is clickable and it redirects a User to the Main page`, function () {
    cy.visit('/guide');
    cy.get('li[class="logo"]').click();

    cy.url().should('eq', 'https://openweathermap.org/')
  })

  it('AT_018.004 | Support > Drop down menu > Verify menu section names', function () {
    const NavBar_Suport = ['FAQ', 'How to start', 'Ask a question']
    cy.get('#desktop-menu #support-dropdown').click()

    cy.get('#desktop-menu .dropdown-menu.dropdown-visible li')
      .should('have.length', NavBar_Suport.length).each((el, i) => {
        cy.wrap(el).should('be.visible').and('contain.text', NavBar_Suport[i])
      })
  })

  it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', function () {
    cy.get('a[href="/guide"]').contains("Guide").click();

    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]')
      .contains('Weather data in a fast and easy-to-use way')
      .should('be.visible')
  })

  it('AT_008.006.02 | Main menu > Guide > Verify The text "OpenWeather products" is displayed.', function () {
    cy.get('a[href="/guide"]').contains("Guide").click();

    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]')
      .contains('OpenWeather products')
      .should('be.visible')
  })

  it('AT_028.004 | About us, verify “Buy in the Marketplace” button', function () {
    cy.get('a[href="/about-us"]').click()
    cy.get('a.round[href*="marketplace"]').click()

    cy.url().should('include', '/marketplace')
  });

  it('AT_050.003 | Footer > The User is redirected to Terms and conditions of sale page', function () {
    cy.get('p[class="section-heading"]').contains('Terms & Conditions').click()
    cy.get('div[class="section-content"]')
      .contains('Terms and conditions of sale')
      .invoke('removeAttr', 'target')
      .click();

    cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf')
  });

  it('AT_017.003 |Support >How to start > Verify navigation to "API care recommendations" page', function () {
    cy.get('#support-dropdown').click({ force: true })
    cy.get('#support-dropdown-menu:nth-child(2) a[href ="/appid"]').click({ force: true })
    cy.url().should('eq', 'https://openweathermap.org/appid')
    cy.get('.breadcrumb-title').should('have.text', "How to start using professional collections")
    cy.get('.doc-container li a[href ="#apicare"]').click({ force: true })

    cy.url().should('eq', 'https://openweathermap.org/appid#apicare')
    cy.get('#apicare h3').should('have.text', 'API care recommendations ')
  });

  it('AT_023.002 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', function () {
    cy.get('div[class="section-content"]')
      .find('li')
      .contains('FAQ')
      .click()

    cy.url().should('eq', 'https://openweathermap.org/faq')
  });

  it('AT_045.003 | Main page > Section with 8-day forecast. Detailed weather for each of these days is displayed', function () {
    cy.get('.daily-container ul.day-list li').first().click()

    cy.get('.daily-container .scrolling-container ul.options-scroller li')
      .each($el => {
        if ($el.hasClass('active')) {
          cy.wrap($el)
            .parents('.scrolling-container-header')
            .next()
            .find('.daily-detail-container')
            .should('be.visible')
        } else {
          cy.wrap($el)
            .click()
            .parents('.scrolling-container-header')
            .next()
            .find('.daily-detail-container')
            .should('be.visible')
        }
      })
  })

  it('AT_033.005 | Header > Navigation > Guide', function () {
    cy.get('div#desktop-menu a[href*="/guide"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.url().should('include', '/guide');
  })

  it('AT_045.005 | Main page > Section with 8-day forecast. Check display of eight days from current date', function () {
    const startDate = new Date().getTime()
    const formatDate = { weekday: 'short', month: 'short', day: '2-digit', timeZone: 'UTC' };

    cy.get('.daily-container ul.day-list li > span')
      .should('have.length', 8)
      .each(($el, i) => { 
        let itemDate = startDate + 86400000 * i
        itemDate = new Date(itemDate).toLocaleDateString('en', formatDate)
        expect($el).to.be.visible
        expect($el.text()).to.include(itemDate);
      })
  })

  it('AT_027.003 |Maps > Section "weather control" > scale-details changes when switching data to Pressure', function () {
    cy.get('a[href="/weathermap"]').contains("Maps").click()
    cy.url().should("include", "https://openweathermap.org/weathermap?")
    cy.get('div.weather-layer-container input[id ="Pressure"]').click({ force: true })

    cy.get('div.leaflet-control-color-scale-line').should('contain', 'Pressure, hPa')
  })

  it('AT_033.010 |Header > Navigation > Verify text “Weather API”', function () {
    cy.get('div#desktop-menu a[href*="/api"]').invoke('removeAttr', 'target').click()

    cy.url().should('include', '/api')
    cy.get('h1.breadcrumb-title').should('have.text', 'Weather API')
  })

  it('AT_014.004 | Support > Ask a question > The captcha error message is displayed', function () {
    cy.get('#support-dropdown').click()
    cy.get('.dropdown-menu').contains('Ask a question').invoke('removeAttr', 'target').click()

    cy.get('#question_form_email').type('user@gmail.com')
    cy.get('#question_form_subject')
      .select('I want to discuss a purchase of OpenWeather products/subscriptions')
    cy.get('#question_form_message').type('some message')
    cy.get('.btn-default').click({force: true})

    cy.get('div[class="help-block"]').contains('reCAPTCHA verification failed, please try again.')
  });

  it('AT_002.013 | Header > Verifying the Main page is open after clicking the logo', function () {
    cy.get('.logo').click();

    cy.url().should('eq', 'https://openweathermap.org/');
  });

  it('AT_029.003 | Footer > Download OpenWeather app, " Get it on Google play" button', function () {
    cy.get('div.my-5 [href*=google]').invoke('removeAttr', 'target').click()

    cy.get('h1 span').should('have.text', 'OpenWeather')
  });

  it.skip('AT_026.001 | Maps > Check that Global Precipitation is visualized on the map', function () {
    cy.get(mainMenuDesk.maps).click();
    cy.get('#map-wrap .global-map').should('be.visible')

    cy.get('label[for="Global Precipitation"]')
      .should('be.visible')
      .and('include.text', 'Global Precipitation')
      .click()

    cy.get('img[src*="sat.owm.io/"]')
      .first()
      .should('be.visible')
      .and("have.attr", "src")
      .and('match', /maps.*radar/)
  })

  it('AT_046.003 | Our initiatives > Our initiatives page is displayed', function () {
    cy.get('a[href="/our-initiatives"]').contains('Our Initiatives').click()

    cy.url().should('eq', 'https://openweathermap.org/our-initiatives')
    cy.get('h1[class="breadcrumb-title"]')
      .contains('Our Initiatives')
      .should('be.visible')
  })

  it('AT_033.017 | Header>Navigation>API>Verify "sign up" link', function () {
    cy.get('#desktop-menu > :nth-child(2) > :nth-child(2)').click()
    cy.contains("sign up").click()
    
    cy.url().should('include', 'https://home.openweathermap.org/users/sign_up')
    cy.get('h3.first-child').should('have.text', 'Create New Account')
  })
 
  it('AT_054.002 | PersonalAccountName > Verify a successful Sign-out', function () {
    cy.get('#desktop-menu .user-li a').click();
    cy.get('.input-group #user_email').type('3065606@gmail.com', {force: true});
    cy.get('.input-group #user_password').type('Qwerty1234', {force: true});
    cy.get('#new_user [value="Submit"]').click({force: true});
    cy.get('div[class="panel-body"]').contains('Signed in successfully.').should('be.visible');

    cy.get('#user-dropdown').click();
    cy.get('#user-dropdown-menu').should('be.visible');
    cy.get('#user-dropdown-menu a.logout').click();

    cy.get('div[class="panel panel-red"]').contains('Alert').should('be.visible');
    cy.get('div[class="panel-body"]').contains('You need to sign in or sign up before continuing.').should('be.visible')
  })

  it.skip("AT_044.004 | Footer > PopUps > Manage cookies > Verify the background color of a button and link when the element is in mouse focus", function () {
    cy.get("#stick-footer-panel .stick-footer-panel__link").each(el => {
        cy.wrap(el).focus().should('have.css', 'background-color', 'rgb(233, 110, 80)')
      });
  })

  it.skip("AT_026.003 | Maps > Сheck that the «Zoom in» button works", function () {
    cy.get(mainMenuDesk.maps).click();
        
    cy.get('a.leaflet-control-zoom-in').click()
    cy.wait(4000)
    
    cy.get('img[src*="//cartodb-basemaps-c.global.ssl.fastly.net/light_all/"]')
      .first()
      .should("have.attr", "src")
      .and('match', /light_all\/6/)
  })

  it('AT_010.010 | Marketplace > Verify the link "Historical Data Archives"', function () {
    cy.get('#desktop-menu [href*="marketplace"]').invoke('removeAttr', 'target').click()
    cy.get('#custom_weather_products h1').should('have.text', "Custom Weather Products")
    cy.get('.category [href*="/zip_code_data/new"]').contains('Historical Weather Data by State for all ZIP codes, USA').click()
    
    cy.get('h4.heading').should('have.text', 'Historical Weather Data by State')
  });

  it('AT_049.001 | User page > Blocked logs > The page is loading and displaying', function () {
    cy.login_asiaJS(this.data.userProfile.email, this.data.userProfile.password)

    cy.get('#myTab a[href="/blocks"]').click()

    cy.location('pathname').should('eq', '/blocks')
    cy.get('.services-table th').contains('Blocked').should('have.text', 'Blocked at')
  });

  it('AT_039.002 | PersonalAccountName > Checking for options in account dropdown menu', function () {
    const accountDropdownOptions = ["My services", "My API keys", "My payments", "My profile", "Logout"]

    cy.login_asiaJS(this.data.userProfile.email, this.data.userProfile.password)
    cy.get('#user-dropdown').click()

    cy.get('#user-dropdown-menu li a').each(($el, i) => {
      expect($el).to.be.visible
      expect($el.text()).to.include(accountDropdownOptions[i]);
    })
  });

  it('AT_028.007 | < Footer > About us, verify the “Where-to” text', function () {
    cy.get('a[href="/about-us"]').click()

    cy.url().should('eq','https://openweathermap.org/about-us')
    cy.get('h2.orange-text').should('have.text','Where-to')
  })

})