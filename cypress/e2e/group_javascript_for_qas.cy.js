/// <reference types="cypress" />

describe('group_javascript_for_qas', () => {
    it('AT_028.001 | Footer > About us > Verify "About us" link redirects to the corresponding page', function () {
        cy.visit('https://openweathermap.org/');
    });
});
