/// <reference types="cypress"/>

import Header from "../pageObjects/Header.js";
import DashboardPage from "../pageObjects/DashboardPage.js";
import SignInPage from "../pageObjects/SignInPage.js";
import QuestionsPage from "../pageObjects/QuestionsPage.js";

const header = new Header();
const dashboardPage = new DashboardPage();
const signInPage = new SignInPage();
const questionsPage = new QuestionsPage();

describe('Dashboard page test suite', () => {

    beforeEach(function() {
        cy.fixture('dashboardPage').then(data => {
            this.data = data;
        });
        cy.fixture('signInPage').then(signInData => {
            this.signInData = signInData;
        });
        cy.fixture('url').then(urlData => {
            this.urlData = urlData;
        });
        cy.fixture('questionsPage').then(questionsData => {
            this.questionsData = questionsData;
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

    it('AT_025.010 | Dashboard > Verify the first button "Contact us" is clickable and redirects User to the Questions page', function () {
        header.clickDashboardMenu()

        dashboardPage.clickContactUsButton()

        cy.url().should('eq', this.urlData.questionsUrl)
        questionsPage.elements.getHeadLine().should('have.text', this.questionsData.headLineText)
    });

    it('AT_025.001 | Main menu > After clicking the Dashboard menu User is redirected to the Dashboard page', function () {
        header.clickDashboardMenu();
        
        cy.url().should('be.equal', this.data.url)
        dashboardPage.elements.getWeatherDashboardTitle().should('have.text', this.data.h1Title)
    });

    it('AT_025.002 | Main menu > Dashboard > After clicking the first "Try the Dashboard" button not authorized User is redirected to Sign in page', function () {
        header.elements.getUserDropDownMenu().should('not.exist');

        header.clickDashboardMenu()
        dashboardPage.elements.getWeatherDashboardTitle().should('be.visible').and('have.text', this.data.h1Title);
        dashboardPage.elements.getTryTheDashboardFirstButton().should('include.text','Try the Dashboard');
        dashboardPage.clickTryTheDashboardFirstButton();
        
        cy.url().should('eq', this.signInData.signInUrlUsers)
        signInPage.elements.getSignInForm().should('exist');
        signInPage.elements.getSignOutAllert().should('have.text', this.signInData.signOutAllertMessage)
    });
});
