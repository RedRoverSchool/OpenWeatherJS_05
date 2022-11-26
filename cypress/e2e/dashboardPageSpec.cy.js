/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import DashboardPage from "../pageObjects/DashboardPage.js";

const header = new Header();
const dashboardPage = new DashboardPage();

describe('Dashboard page test suite', () => {

    beforeEach(function() {
        cy.fixture('dashboardPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu link', function () {
        header.clickDashboardMenu();

        cy.url().should('be.equal', this.data.url)
        dashboardPage.elements.getWeatherDashboardTitle().should('have.text', this.data.h1Title)
    });
});
