/// <reference types="cypress" />

describe('group Ark', () => {

  it(`AT_008.005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, () => {
    cy.visit("https://openweathermap.org/");
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.url().should("eq", "https://openweathermap.org/guide");
  }); 
});
