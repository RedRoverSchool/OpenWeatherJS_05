/// <reference types="Cypress" />


describe('use data from fixtures', () => {

    before(() => {
        cy.visit('https://demoqa.com/');
        cy.get('div.card-body h5').contains('Elements').click();
        cy.get('div.element-group div.header-text').contains('Widgets').click();
        cy.get('ul.menu-list li[id="item-5"] span').contains('Tabs').click();
    })

    beforeEach(function () {
        cy.fixture('headersData').then((data) => {
            this.data = data;
        })
    })

    it('verify header text on Tabs page', function () {
        cy.get('#tabsContainer div.mb-3').should('have.text', this.data.headerTabsContainer);
    })

    it('verify tabs names', function () {
        cy.get('nav.nav-tabs a').each(($el, index) => {
            expect($el.text()).to.be.equal(this.data.tabs[index]);
        })
    })

    it('verify the first tab name', function () {
        cy.get('nav.nav-tabs a').eq(0).should('have.text', this.data.tabs[0]);
    })

    // it('verify tabs names', function () {
    //     cy.get('nav.nav-tabs a').then(($el) => {
    //         expect($el.text()).to.deep.equal(this.data.tabs.join(''));
    //     })
    // })

    //this is to print in logs with promise
    it('verify the first tab name', function () {
        cy.log(this.data.tabs[0]);

        //не работает
        // let header1 = cy.get('#tabsContainer div.mb-3').text();
        // cy.log(header1)

        //работает
        cy.get('#tabsContainer div.mb-3').then(function (header) {
            cy.log(header.text());
        })
    })
})

