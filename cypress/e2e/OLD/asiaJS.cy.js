/// <reference types="cypress" />


describe('asiaJS', () => {
  beforeEach(function () {
    cy.fixture('asiaJS').then((data) => {
      this.data = data
    });

    cy.visit('/');
  });

  it('AT_010.002 | Marketplace > Verify link “History Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', '/marketplace');
    cy.get('.product-container a[href="/history_bulks/new"]:not(.button-round)').click();
    cy.url().should('include', '/history_bulks/new');
  });

  it('AT_010.003 | Marketplace > Verify link “History Forecast Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', '/marketplace');
    cy.get('.product a[href*="forecast"]:not(.button-round)').click();
    cy.url().should('include', '/history_forecast_bulks/new');
  });

  it('AT_010.005 | Marketplace > Verify link “Historical Weather Data by State for all ZIP codes, USA” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', '/marketplace');
    cy.get('.product a[href="/zip_code_data/new"]:not(.button-round)').click();
    cy.url().should('include', '/zip_code_data/new');
  });

  it.skip('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', () => {
    cy.get('[href$="website_terms_and_conditions_of_use.pdf"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', 'terms_and_conditions_of_use.pdf');
  });

  it('AT_003.002 | Main page > Section with search > Verify the converted temperature in °C is correct', function () {
    const Imperial_F = '#selected:not(.slideRight)';
    const Metric_C = '#selected:not(.slideLeft)';
    cy.get('.option')
      .eq(1)
      .click();
    cy.get(Imperial_F); // Ожидаем, когда cypress найдет id selected в котором не будет содержаться класс slideRight (.slideRight пропадет, когда на сайте преобразуется температура в °F)
    const result = Array();
    cy.get(`.current-temp .heading`)
      .invoke('text')
      .then((tempF) => {
        let formula_convert_tempF_to_tempC = Math.round((parseInt(tempF) - 32) * 5 / 9);
        result.push(formula_convert_tempF_to_tempC, formula_convert_tempF_to_tempC - 1, formula_convert_tempF_to_tempC + 1, formula_convert_tempF_to_tempC - 2, formula_convert_tempF_to_tempC + 2)
      });
    cy.get('.option')
      .eq(0)
      .click();
    cy.get(Metric_C); // Ожидаем, когда cypress найдет id selected в котором не будет содержаться класс slideLeft (.slideLeft пропадет, когда на сайте преобразуется температура °C)
    cy.get('.current-temp .heading')
      .invoke('text')
      .then((tempC) => {
        expect(result).to.includes(parseInt(tempC))
      });
  });

  it('AT_001.014 | Main page > Search section > Verify that entered city is displayed into the dropdown', () => {
    cy.get('div.search-container').type('Cambridge');
    cy.get('button[type="submit"]').click();
    cy.get('ul span[style="width: 140px;"]')
      .contains('Cambridge, GB')
      .click();
  });

  it.skip('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"', () => {
    const buttonGuide = '#mobile-menu a[href="/guide"]';
    const titleGuide = 'h1.breadcrumb-title';

    cy.get(buttonGuide).should('contain.text', 'Guide');
    cy.get(buttonGuide).click({ force: true });

    cy.url().should('include', '/guide');
    cy.get(titleGuide).should('be.visible');
  });

  it('AT_005.005 | Main page > Verifying the website"s description is correct and visible', () => {
    cy.get('.mobile-padding h2 .white-text')
      .should('be.visible')
      .and('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way');
  });

  it('AT_045.008 | Main page > Section with 8-day forecast > See the weather forecast for 8 days', function () {
    let current_date = String();

    cy.get('.day-list li').should('have.length', 8);
    cy.get('.current-container .orange-text')
      .invoke('text')
      .then(function (date) {
        current_date = date.split(',')[0]
      });

    cy.get('.day-list li').eq(0)
      .invoke('text')
      .then((d) => {
        expect(d).to.include(current_date)
      });
  });

  it('AT_046.004 | Main page > Our initiatives > button "Learn more" > page has text Student initiative', () => {
    cy.get('#desktop-menu a[href="/our-initiatives"]').click();
    cy.get('.ow-btn').click();
    cy.url().should('include', '/student-initiative');
    cy.get('.topic h1').should('have.text', 'Student initiative');
  });

  it.skip('AT_016.002 | Support > FAQ page > Verify the question "How to get an API key" is opened and visible by clicking on it', () => {
    const faqLink = '#support-dropdown-menu [href="/faq"]';
    const howToGet = '#how-to-get-an-API-key';

    cy.get('#support-dropdown').click();
    cy.get(faqLink).click();

    cy.get(`${howToGet} .question-heading`).click({ force: true });
    cy.get(`${howToGet} .question.visible`).should('be.visible');
    cy.get(`${howToGet} .question-content`)
      .contains('get an API key (APPID)')
      .should('be.visible');
  });

  it('AT_042.005 | User page >My payments>Verify that text displays on the page', function () {
    const buttonSignIn = '.user-li a';
    const userEmail = '.input-group input#user_email';
    const userPassword = '.input-group input#user_password';
    const submitButton = 'input[value="Submit"]';

    cy.get(buttonSignIn).click({ force: true });
    cy.get(userEmail).type(this.data.email);
    cy.get(userPassword).type(this.data.password).should('be.visible');
    cy.get(submitButton).click({ force: true });

    cy.get('div.inner-user-container').should('contain.text', 'Asia Tester').click({ force: true });
    cy.get('.dropdown-menu a[href="/payments"]').click({ force: true });
    cy.url().should('include', '/payments');
  });

  it('AT_048.003 Myservices > Billing plans > Verify billing plans are present', function () {
    cy.login_asiaJS(this.data.email, this.data.password);
    cy.visit('https://home.openweathermap.org/myservices');

    cy.get('[href="/subscriptions"]').click();
    cy.url().should('include', '/subscriptions');
    cy.get('#myTab li.active').should('have.text', '\nBilling plans\n');
  });

  it('AT_013.008 | Blog > Weather > Verify that after landing on the Blog page 10 posts displayed on the first page', () => {
    cy.get('#desktop-menu [href*="/blog/category/weather"]').invoke('removeAttr', 'target').click();
    cy.get('.post-list .post').should('have.length', 10);
  });

  it('AT_013.009 | Blog > Weather > All posts links are clickable and redirect a user to the posts in a new page', () => {
    cy.get('#desktop-menu [href*="/blog/category/weather"]').invoke('removeAttr', 'target').click();

    cy.get('.post-list .post').each((el, i) => {
      cy.get('.post-list .post .post__title-link')
        .eq(i)
        .invoke('attr', 'href').then((endpoint) => {
          cy.request(endpoint).then((response) => {

            expect(response.status).to.eql(200);
          });
        });
    });
  });

  it('AT_045.009 | Main page > Section with 8-day forecast > Detailed weather for each of these days is displayed', function () {
    let detailed_weather_information = Array();

    cy.get('[fill="#48484A"]').each((el, i) => {
      cy.get('[fill="#48484A"]')
        .eq(i)
        .click({ force: true });
      cy.get('.scrolling-container').should('be.visible');
      cy.get('.daily-detail-container tr')
        .eq(0)
        .find('th')
        .each(($item, index) => {
          if ($item.text().length) detailed_weather_information.push($item.text());
        }).then(() => {

          expect(detailed_weather_information).to.deep.eql(this.data.weather_details);
          detailed_weather_information = [];
        });
    });
  });

});
