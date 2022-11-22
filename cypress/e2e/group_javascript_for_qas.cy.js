/// <reference types="cypress" />

describe('group_javascript_for_qas', () => {

    beforeEach(function () {
        cy.fixture('group_javascript_for_qas').then(data => {
            this.data = data;
        });
        cy.visit('https://openweathermap.org/');
    });

    it('AT_028.001 | Footer > About us > Verify "About us" link redirects to the corresponding page', function () {
        cy.get('a[href="/about-us"]').click();
        cy.url().should('include', '/about-us');
    });

    it('AT_015.002 | Header > Support > Ask a question > Verify error message for an unauthorised user', function () {
        const SIGN_IN_BARMENU_ITEM =  "li.user-li a";
        const SUPPORT_BARMENU_ITEM = "li.with-dropdown div"
        const ASK_QUESTION_SUB_SUPPORTMENU_ITEM ="ul#support-dropdown-menu a[href*='/questions']";
        const YES_USER_AUTH_RADIO_BTN = "input#question_form_is_user_true";
        const ALERT_ERROR_AUTH_MESSAGE ="div#prompt";

        cy.get(SIGN_IN_BARMENU_ITEM).should('be.visible', 'Sign in');
        cy.get(SUPPORT_BARMENU_ITEM).click();
        cy.get(ASK_QUESTION_SUB_SUPPORTMENU_ITEM).invoke('removeAttr', 'target').click()
        cy.title().should('eq', 'Members');

        cy.get(YES_USER_AUTH_RADIO_BTN).check().should('be.checked')
        cy.get(ALERT_ERROR_AUTH_MESSAGE).should('be.visible')
                                        .should('have.text', 'Please enter your account email in our system - it will help us process your request faster')
                                        .should('have.class', 'alert-info')
                                        .should('have.css', 'background-color', 'rgba(120, 203, 191, 0.08)')
    });

    it('AT_004.001 | Main page > Verify the temperature can be switched from Imperial to Metric', function () {
        cy.get('.switch-container > div:nth-of-type(3)').should('contain', 'Imperial: °F, mph');
        cy.get('.switch-container > div:nth-of-type(2)').should('contain', 'Metric: °C, m/s').click();
    });

    it('AT_023.001 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', function () {
        cy.get('.section-content a[href="/faq"]').click();
        cy.url().should('contain', '/faq');
    });

    it('AT_008.001 | Main menu > Guide > Verify URL and header is displayed on the page', function () {
        const GUIDE_BARMENU_ITEM = "div#desktop-menu a[href='/guide']";
        const MAINHEADER_H1_GUIDE_PAGE = "div.col-sm-12 h1";

        cy.get(GUIDE_BARMENU_ITEM).click();
        cy.url().should('contain', '/guide');
        cy.get(MAINHEADER_H1_GUIDE_PAGE).should("have.text", this.data.headers1)
    });

    it('AT_008.012 | Main menu > Guide > Verify subheaders are displayed on the page', function () {
        const GUIDE_BARMENU_ITEM = "div#desktop-menu a[href='/guide']";
        const SUBHEADERS_H2_GUIDE_PAGE = "main h2";
        const SUBHEADERS_H4_GUIDE_PAGE = "h4 b";

        cy.get(GUIDE_BARMENU_ITEM).click();

        cy.get(SUBHEADERS_H2_GUIDE_PAGE).each(($el, idx) => {
            expect($el.text()).to.include(this.data.headers2[idx])
        })
        cy.get(SUBHEADERS_H4_GUIDE_PAGE).each(($el, idx) => {
            expect($el.text()).to.include(this.data.headers4[idx])
        })
    });

    it('AT_048.001 | User page > Billing plans > Verify page for billing plans', function () {
        cy.get("li.user-li a").contains("Sign in").click();
        cy.get("#user_email").type("rokhmanova@yahoo.com");
        cy.get("#user_password.form-control").type("qatest01");
        cy.contains("Submit").click();
        cy.get(".panel-body").should("have.text", "Signed in successfully.");
        cy.get("#user-dropdown").should("contain", "Iryna").click();
        cy.get("#user-dropdown-menu a[href='/myservices']").click();
        cy.get("#myTab a[href='/subscriptions']").should("have.text", "Billing plans").click();
        cy.url().should("contain", "/subscriptions");
        cy.get("h3.subscribe-title a").should("contain", "One Call by Call");
    });
    
    it('AT_005.004 | Verify the website’s name and description is correct and visible', function () {
        cy.get('h1 .orange-text').should('be.visible').each(($el, idx) => {
            expect($el.text()).to.contain(this.data.title)
        })
        cy.get('h2 .white-text').should('be.visible').each(($el, idx) => {
            expect($el.text()).to.contain(this.data.description)
        })
    })   

});