/// <reference types="cypress" />

import NewProductPage from "../pageObjects/NewProductsPage";

describe('New Products page test suite', () => {

    beforeEach(function () {
        cy.fixture('newProducts').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_047.001', function () {
        cy.login(data.loginData.email, data.loginData.password)

    })
});