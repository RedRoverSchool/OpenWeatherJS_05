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

        questionsPage.fillQuestionFormAsNotAuser(this.data.email, 2, this.data.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });

    it('AT_014.001 | Support > Ask a question > After not checking reCAPTCHA the error message appears', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.data.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.data.email, 2, this.data.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });
});