
/// <reference types="cypress"/> 

describe("arkGroup", () => {
  it(`AT_008005 | Main menu > Verify the user be redirected to new URL by clicking "Guide"`, () => {
    cy.visit("https://openweathermap.org/");
    cy.get('a[href="/guide"]').contains("Guide").click();
    cy.url().should("eq", "https://openweathermap.org/guide");
  });
});

describe("group Ark", () => {
  it("AT_010.004 | Marketplace > Verify all orange links on the page", () => {
    cy.visit("https://openweathermap.org/");
    cy.get("#desktop-menu [href*=market]")
      .invoke("removeAttr", "target")
      .click();
    cy.get(".market-place .product h5 a").each((el) => {
      cy.wrap(el).should("have.css", "color", "rgb(235, 110, 75)");
      cy.request(el.prop("href")).should((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });
});