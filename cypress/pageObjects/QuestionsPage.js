class QuestionsPage {
    elements = {
        getHeadLine: () => cy.get('.headline'),
        getQuestionFormIsUser: () => cy.get('#question_form_is_user_false'),
        getEmailInputField: () => cy.get('#question_form_email'),
        getSubjectDropDownField: () => cy.get('#question_form_subject'),
        getSubjectDropDownFieldAllOptions: () => cy.get('#question_form_subject option'),
        getMessageInputField: () => cy.get('#question_form_message'),
        getSubmitBtn: () => cy.get('.btn'),
        getCaptchaError: () => cy.get('.has-error'),
        getErrorAuthMsge: () => cy.get('div#prompt'),        
        getUserAuthYes: ()  => cy.get('input#question_form_is_user_true')        
    }

    selectNotAuser() {
        this.elements.getQuestionFormIsUser().check();
    };

    enterEmail(email) {
        this.elements.getEmailInputField().type(email);
    };

    selectSubject(optionNumber) {
        this.elements.getSubjectDropDownFieldAllOptions().each(($el, idx) => {
           if(idx == optionNumber) {
            this.elements.getSubjectDropDownField().select($el.text());
            }
        })
    };

    enterMessage(message) {
        this.elements.getMessageInputField().type(message);
    };

    clickSubmitBtn() {
        this.elements.getSubmitBtn().click();
    };

    fillQuestionFormAsNotAuser(email, optionNumber, message) {
        this.selectNotAuser();
        this.enterEmail(email);
        this.selectSubject(optionNumber);
        this.enterMessage(message);
        this.clickSubmitBtn();
    }

    checkAuthUserYes() {
        this.elements.getUserAuthYes().check();
    };
    
}
export default QuestionsPage;