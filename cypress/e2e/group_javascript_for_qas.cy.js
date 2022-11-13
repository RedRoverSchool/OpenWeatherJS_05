/// <reference types="cypress" />

describe('group_javascript_for_qas', () => {
    it('AT_028.001 | Footer > About us > Verify "About us" link redirects to the corresponding page', function () {
        cy.visit('https://openweathermap.org/');
    });

    it('AT_004.001 | Main page > Verify the temperature can be switched from Imperial to Metric', function(){
        cy.visit('https://openweathermap.org');
        cy.get('.switch-container > div:nth-of-type(3)').should('contain', 'Imperial: °F, mph');
        cy.get('.switch-container > div:nth-of-type(2)').should('contain', 'Metric: °C, m/s').click();
  });
});
