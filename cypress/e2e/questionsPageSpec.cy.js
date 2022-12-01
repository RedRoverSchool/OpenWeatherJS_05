/// <reference types="cypress" />

import Header from "../pageObjects/Header.js";
import QuestionsPage from "../pageObjects/QuestionsPage.js";

const header = new Header();
const questionsPage = new QuestionsPage();


describe('Questions page test suite', () => {

    beforeEach(function () {
        cy.fixture('questionsPage').then(questionsPage => {
            this.questionsPage = questionsPage;
        });
        cy.visit('/');
    });

    it('AT_015.001 | questionsPage > Not checking eCAPTCHA checkbox', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.questionsPage.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.questionsPage.email, 2, this.questionsPage.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.questionsPage.reCaptchaError);
    });

    it('AT_014.001 | questionsPage > After not checking reCAPTCHA the error message appears', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.questionsPage.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.questionsPage.email, 2, this.questionsPage.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.questionsPage.reCaptchaError);
    });
});