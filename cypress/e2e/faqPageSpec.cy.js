/// <reference types="cypress"/>

import FAQPage from "../pageObjects/FAQPage.js";
import Header from "../pageObjects/Header.js";


const header = new Header();
const faqPage = new FAQPage();

describe('faqPageSpec', () => {

    beforeEach(function () {
        cy.fixture('faqPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_016.002 | FAQ page > Verify the question "How to get an API key" is opened and visible', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        faqPage.clickHowToGetAnApiKeyQuestion();
        faqPage.elements.getHowToGetAnApiKeyQuestionAfterClicking().should('be.visible');
        faqPage.elements.getHowToGetAnApiKeyQuestionContent()
            .contains(this.data.HowToGetAnApiKeyQuestionContent)
            .should('be.visible');
    });

    it('AT_016.003 | Support > FAQ page > Verify text questions and style by clicking on the question plus sign', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        faqPage.elements.getQuestionsElement().each(($el, index) => {
            cy.wrap($el)
              .click({force: true})
              .should('have.css', 'font-weight', '600')
              .and('have.text', this.data.faqQuestions[index]);
        });
    });
});