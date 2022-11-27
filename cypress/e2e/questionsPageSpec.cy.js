/// <reference types="cypress" />

import Header from "../pageObjects/Header.js";
import QuestionsPage from "../pageObjects/QuestionsPage.js";

const header = new Header();
const questionsPage = new QuestionsPage();


describe('Questions page test suite', () => {

    beforeEach(function () {
        cy.fixture('questionsPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_015.001 | Header > Support > Ask a question > Not checking eCAPTCHA checkbox', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.data.headLineText);

        questionsPage.selectNotAuser();
        questionsPage.enterEmail(this.data.email);
        questionsPage.selectFirstSubject();
        questionsPage.enterMessage(this.data.message);
        questionsPage.clickSubmitBtn();

        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });
});