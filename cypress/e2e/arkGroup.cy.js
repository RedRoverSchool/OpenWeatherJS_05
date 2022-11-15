/// <reference types="cypress" />

describe('group Ark', () => {


  it(`AT_008.005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, () => {
    cy.visit("https://openweathermap.org/");
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.url().should("eq", "https://openweathermap.org/guide");
  });


  it('AT_010.004 | Marketplace > Verify all orange links on the page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu [href*=market]').invoke('removeAttr', 'target').click()
    cy.get('.market-place .product h5 a').each(el => {
      cy.wrap(el).should('have.css', 'color', 'rgb(235, 110, 75)')
      cy.request(el.prop('href')).should(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  });

  it('AT_030.001|Footer>Verify redirection to terms and conditions', function () {
    cy.visit('https://openweathermap.org/')

    cy.get('div.footer-section a[href*="Openweather_website_terms_and_conditions"]')
      .invoke("removeAttr", "target")
      .click()
    cy.url().should('include', 'website_terms_and_conditions_of_use.pdf')
  })


  it(`AT_002.002 | Header > Verifying the website's logo is clickable and it redirects a User to the Main page`, () => {
    cy.visit('https://openweathermap.org/guide');
    cy.get('li[class="logo"]').click();
    cy.url().should('eq', 'https://openweathermap.org/')
  })

  it('AT_018.004 | Support > Drop down menu. Check visible link and verify URL', () => {
    const $supportMenu = [['FAQ', '/faq'], ['How to start', '/appid'], ['Ask a question', '/questions']]
    cy.visit('https://openweathermap.org/')
    cy.get('#desktop-menu #support-dropdown').parent()
      .find('a').should('have.length', $supportMenu.length).each(($el, $i) => {
        let $parentLi = $el.parent().parent().parent()
        cy.wrap($parentLi).get('#support-dropdown').click().parent()
          .contains($supportMenu[$i][0]).should('be.visible')
          .invoke('removeAttr', 'target').click()
        cy.url().should('include', $supportMenu[$i][1])
      })
  })


  it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', () => {
    cy.visit('https://openweathermap.org/');
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]').contains('Weather data in a fast and easy-to-use way').should('be.visible')
  })


  it('AT_008.006.02 | Main menu > Guide > Verify The text "OpenWeather products" is displayed.', () => {
    cy.visit('https://openweathermap.org/');
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.get('.wrapper').should('be.visible')
    cy.get('div[class="col-sm-12"]').contains('OpenWeather products').should('be.visible')
  })


  it('AT_028.004 | About us, verify “Buy in the Marketplace” button', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('a[href="/about-us"]').click()
    cy.get('a.round[href*="marketplace"]').click()
    cy.url().should('include', '/marketplace')
  });


  it('AT_050.003 | Footer > The User is redirected to Terms and conditions of sale page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('p[class="section-heading"]').contains('Terms & Conditions').click()
    cy.get('div[class="section-content"]').contains('Terms and conditions of sale').invoke('removeAttr', 'target').click();
    cy.url().should('eq', 'https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf')
  });


  it('AT_017.003 |Support >How to start > Verify navigation to "API care recommendations" page', function () {
    cy.visit('https://openweathermap.org/');
    cy.get('#support-dropdown').click({ force: true })
    cy.get('#support-dropdown-menu:nth-child(2) a[href ="/appid"]').click({ force: true })
    cy.url().should('eq', 'https://openweathermap.org/appid')
    cy.get('.breadcrumb-title')
      .should('have.text', "How to start using professional collections")

    cy.get('.doc-container li a[href ="#apicare"]').click({ force: true })
    cy.url().should('eq', 'https://openweathermap.org/appid#apicare')
    cy.get('#apicare h3').should('have.text', 'API care recommendations ')
  });


  it('AT_023.002 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('div[class="section-content"]').find('li').contains('FAQ').click()
    cy.url().should('eq', 'https://openweathermap.org/faq')
  });


  it('AT_045.003 | Main page > Section with 8-day forecast. Detailed weather for each of these days is displayed', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('.daily-container ul.day-list li').first().click()
    cy.get('.daily-container .scrolling-container ul.options-scroller li')
      .each($el => {
        if ($el.hasClass('active')) {
          cy.wrap($el).parents('.scrolling-container-header').next().find('.daily-detail-container').should('be.visible')
        } else {
          cy.wrap($el).click().parents('.scrolling-container-header').next().find('.daily-detail-container').should('be.visible')
        }
      })
  })

  it('AT_033.005 | Header > Navigation > Guide', () => {
    cy.visit('https://openweathermap.org/')
    cy.get('div#desktop-menu a[href*="/guide"]').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/guide');
  })

  it('AT_045.005 | Main page > Section with 8-day forecast. Check display of eight days from current date', () => {
    cy.visit('https://openweathermap.org/')  
    cy.get('.daily-container ul.day-list li > span')
      .then($elArr => {
        expect($elArr).to.have.length(8)
        const startDate = new Date().getTime()
        const formatDate = { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' };
        let itemDate         
        cy.wrap($elArr).each(($el, $i) => {
          itemDate = startDate + 86400000 * $i
          itemDate = new Date(itemDate).toLocaleDateString('en', formatDate)
          cy.wrap($el).should('include.text', itemDate)
        })  
      })
    })


  it('AT_027.003 |Maps > Section "weather control" > scale-details changes when switching data to Pressure', () => {
    cy.visit("https://openweathermap.org/");
    cy.get('a[href="/weathermap"]').contains("Maps").click()
    cy.url().should("include", "https://openweathermap.org/weathermap?")

    cy.get('div.weather-layer-container input[id ="Pressure"]').click({force: true})
    cy.get('div.leaflet-control-color-scale-line')
      .should('contain', 'Pressure, hPa')
  })
   
it('AT_033.010 Header > Navigation >  “API” ', () => {
  cy.visit('https://openweathermap.org/')
  cy.get('div#desktop-menu a[href*="/api"]').invoke('removeAttr', 'target').click()
  cy.url().should('include', '/api');
})
})
