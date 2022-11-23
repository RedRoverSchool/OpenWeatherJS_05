class QuestionsPage {
    elements = {
        getHeadLine: () => cy.get('.headline'),
        getQuestionFormIsUser: () => cy.get('#question_form_is_user_false'),
        getEmailInputField: () => cy.get('#question_form_email'),
        getSubjectInputField: () => cy.get('#question_form_subject'),
        getMessageInputField: () => cy.get('#question_form_message'),
        getSubmitBtn: () =>  cy.get('.btn'),
        getCaptchaError: () => cy.get('.has-error'),
    }

    selectNotAuser () {
        cy.get('#question_form_is_user_false').check();
    };

    enterEmail (email) {
        cy.get('#question_form_email').type(email);
    };

    selectFirstSubject () {
        cy.get('#question_form_subject')
        .select('I want to discuss a purchase of OpenWeather products/subscriptions');
    };

    enterMessage (message) {
        cy.get('#question_form_message').type(message);
    };

    clickSubmitBtn () {
        cy.get('.btn').click();
    };

}
export default QuestionsPage;