/// <reference types="cypress" />


describe('asiaJS', () => {
  beforeEach(() => {
    cy.visit('https://openweathermap.org/')
  });

  it('AT_010.002 | Marketplace > Verify link “History Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url()
      .should('include', '/marketplace');
    cy.get('.product-container a[href="/history_bulks/new"]:not(.button-round)')
      .click();
    cy.url()
      .should('include', '/history_bulks/new');
  });

  it('AT_010.003 | Marketplace > Verify link “History Forecast Bulk” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url()
      .should('include', '/marketplace');
    cy.get('.product a[href*="forecast"]:not(.button-round)')
      .click();
    cy.url()
      .should('include', '/history_forecast_bulks/new');
  });

  it('AT_010.005 | Marketplace > Verify link “Historical Weather Data by State for all ZIP codes, USA” are clickable', () => {
    cy.get('#desktop-menu [href$="marketplace"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url()
      .should('include', '/marketplace');
    cy.get('.product a[href="/zip_code_data/new"]:not(.button-round)')
      .click();
    cy.url()
      .should('include', '/zip_code_data/new');
  });

  it('AT_030.003 | Footer > Website terms and conditions > Verify redirecting to new url', () => {
    cy.get('[href$="website_terms_and_conditions_of_use.pdf"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.url()
      .should('include', 'terms_and_conditions_of_use.pdf');
  });

  it.skip('AT_003.002 | Main page > Section with search > Verify the converted temperature in °C is correct', () => {
    cy.get('.option')
      .eq(1)
      .click();
    cy.wait(2000)
    let math_operation;
    cy.get('.current-temp .heading')
      .invoke('text')
      .then((tempF) => {
        math_operation = Math.round((parseInt(tempF) - 32) * 5 / 9)
      });
    cy.get('.option')
      .eq(0)
      .click();
    cy.wait(2000);
    cy.get('.current-temp .heading')
      .invoke('text')
      .then((tempC) => {
        expect(parseInt(tempC)).to.eql(math_operation)
      });
  });

  it('AT_001.014 | Main page > Search section > Verify that entered city is displayed into the dropdown', () =>{
    cy.get('div.search-container')
        .type('Cambridge');
    cy.get('button[type="submit"]')
        .click();
    cy.get('ul span[style="width: 140px;"]')
        .contains('Cambridge, GB')
        .click();
      });

  it('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"',()=>{
      const buttonGuide = '#mobile-menu a[href="/guide"]';
      const titleGuide = 'h1.breadcrumb-title';

      cy.get(buttonGuide).should('contain.text', 'Guide');
      cy.get(buttonGuide).click({force: true});

      cy.url().should('include', '/guide');
      cy.get(titleGuide).should('be.visible');
      });

  it('AT_005.005 | Main page > Verifying the website"s description is correct and visible', () => {
    cy.get('.mobile-padding h2 .white-text')
      .should('be.visible')
      .and('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way');    
  });
  
});
