/// <reference types="cypress" />

import NewProductsPage from "../pageObjects/NewProductsPage";

const newProductPage = new NewProductsPage();

describe('New Products page test suite', () => {

    beforeEach(function () {
        cy.fixture('newProducts').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url  => {
            this.url = url;
        });
        cy.visit('/');
    });

    it('AT_047.001', function () {
        cy.login(this.data.loginData.email, this.data.loginData.password)
        cy.url().should('include', this.url.NewProducts)
        newProductPage.elements.getActiveElement().should('contain.text', this.data.newProductsHeading)
    })
});
