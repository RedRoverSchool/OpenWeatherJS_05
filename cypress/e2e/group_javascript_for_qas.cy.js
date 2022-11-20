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
        cy.get('li.user-li a').should('have.text', 'Sign in');

        cy.get("li.with-dropdown div").click();
        cy.get("ul#support-dropdown-menu a[href='https://home.openweathermap.org/questions']").invoke('removeAttr', 'target').click()
        cy.title().should('eq', 'Members');

        cy.get('input#question_form_is_user_true').check().should('be.checked')
        cy.get('div#prompt').should('be.visible');
        cy.get('div#prompt').should('have.text', 'Please enter your account email in our system - it will help us process your request faster')
        cy.get('div#prompt').should('have.class', 'alert-info');
        cy.get('div#prompt').should('have.css', 'background-color', 'rgba(120, 203, 191, 0.08)')
    });

    it('AT_004.001 | Main page > Verify the temperature can be switched from Imperial to Metric', function () {
        cy.get('.switch-container > div:nth-of-type(3)').should('contain', 'Imperial: °F, mph');
        cy.get('.switch-container > div:nth-of-type(2)').should('contain', 'Metric: °C, m/s').click();
    });

    it('AT_023.001 | Footer > FAQ > Verify "FAQ" link redirects to the corresponding page', function () {
        cy.get('.section-content a[href="/faq"]').click();
        cy.url().should('contain', '/faq');
    });

    it('AT_008.001 | Main menu > Guide > Verify URL and headers are displayed on the page', function () {
        cy.get("div#desktop-menu a[href='/guide']").click();
        cy.url().should('contain', '/guide');
        cy.get("div.col-sm-12 h1").should("have.text", this.data.headers1)
        cy.get("main h2").each(($el, idx) => {
            expect($el.text()).to.include(this.data.headers2[idx])
        })
        cy.get("h4 b").each(($el, idx) => {
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

});
