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

    it('AT_015.001 | questionsPage > Not checking eCAPTCHA checkbox', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.data.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.data.email, 2, this.data.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });

    it('AT_014.004 | Support > Ask a question > The captcha error message is displayed', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.data.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.data.email, 3, this.data.message);
        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });
 
    it('AT_014.001 | questionsPage > After not checking reCAPTCHA the error message appears', function () {
        header.clickSupportDropDownMenu();
        header.clickAskAquestionMenuLink();
        questionsPage.elements.getHeadLine().should('have.text', this.data.headLineText);

        questionsPage.fillQuestionFormAsNotAuser(this.data.email, 2, this.data.message)

        questionsPage.elements.getCaptchaError().should('have.text', this.data.reCaptchaError);
    });

    it('AT_015.002 | QuestionsPage > Verify error message for an unauthorised user', function () {
        header.elements.getSignInMenuLink().should('have.text', 'Sign in');

        header.elements.getSupportDropDownMenuList();
        header.clickAskAquestionMenuLink();

        questionsPage.checkAuthUserYes();
        questionsPage.elements.getUserAuthYes().should('be.checked');
        questionsPage.elements.getUserAuthYes().should('be.visible');        
        questionsPage.elements.getErrorAuthMsge().should('be.visible')
                                                .and('have.text', this.data.errorAuthUserText)
                                                .and('have.class',this.data.errorAuthUserClass)
                                                .and('have.css' ,'background-color',this.data.errorAuthUserBGCColor)
    });
});