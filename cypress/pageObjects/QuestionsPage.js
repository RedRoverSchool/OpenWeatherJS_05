class QuestionsPage {
    elements = {
        getHeadLine: () => cy.get('.headline'),
        getQuestionFormIsUser: () => cy.get('#question_form_is_user_false'),
        getEmailInputField: () => cy.get('#question_form_email'),
        getSubjectInputField: () => cy.get('#question_form_subject'),
        getMessageInputField: () => cy.get('#question_form_message'),
        getSubmitBtn: () => cy.get('.btn'),
        getCaptchaError: () => cy.get('.has-error')
    }

    selectNotAuser() {
        this.elements.getQuestionFormIsUser().check();
    };

    enterEmail(email) {
        this.elements.getEmailInputField().type(email);
    };

    selectFirstSubject() {
        this.elements.getSubjectInputField()
            .select('I want to discuss a purchase of OpenWeather products/subscriptions');
    };

    enterMessage(message) {
        this.elements.getMessageInputField().type(message);
    };

    clickSubmitBtn() {
        this.elements.getSubmitBtn().click();
    };
}
export default QuestionsPage;