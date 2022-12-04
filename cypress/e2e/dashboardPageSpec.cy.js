/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import DashboardPage from "../pageObjects/DashboardPage.js";
import SignInPage from "../pageObjects/SignInPage.js";

const header = new Header();
const dashboardPage = new DashboardPage();
const signInPage = new SignInPage();

describe('Dashboard page test suite', () => {

    beforeEach(function() {
        cy.fixture('dashboardPage').then(data => {
            this.data = data;
        });
        cy.fixture('signInPage').then(signInData => {
            this.signInData = signInData;
        });
        cy.visit('/');
    });

    it('AT_033.001 | Header > Navigation > Verify "Dashboard" menu link', function () {
        header.clickDashboardMenu();

        cy.url().should('be.equal', this.data.url)
        dashboardPage.elements.getWeatherDashboardTitle().should('have.text', this.data.h1Title)
    });

    it('AT_025.009 | Main menu > Dashboard > Verify the first button "Try the Dashboard" is clickable and redirects User to the Sign in page', function () {
        header.clickDashboardMenu()

        dashboardPage.clickTryTheDashboardFirstButton()

        cy.url().should('eq', this.signInData.signInUrlUsers)
        signInPage.elements.getSignOutAllert().should('have.text', this.signInData.signOutAllertMessage)
    });
});
