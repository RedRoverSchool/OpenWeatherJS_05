/// <reference types="cypress" />


describe('asiaJS', () => {
  beforeEach(() => {
    cy.visit('https://openweathermap.org/')
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

  it('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', () => {
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

  it('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"', () => {
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

});
