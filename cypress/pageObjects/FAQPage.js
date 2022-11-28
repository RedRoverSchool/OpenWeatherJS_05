class FAQPage {
    elements = {
        getTitle: () => cy.get('div.topic h1'),
        getHowToGetAnApiKeyQuestion: () => cy.get('#how-to-get-an-API-key .question-heading'),
        getHowToGetAnApiKeyQuestionAfterClicking: () => cy.get('#how-to-get-an-API-key .question.visible'),
        getHowToGetAnApiKeyQuestionContent: () => cy.get('#how-to-get-an-API-key .question-content'),
    };

    clickHowToGetAnApiKeyQuestion() {
        this.elements.getHowToGetAnApiKeyQuestion().click({ force: true });
    };
};
export default FAQPage;