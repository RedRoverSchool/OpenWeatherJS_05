/// <reference types="Cypress" />


describe('pop-up windows', () => {

    before(() => {
        cy.visit('https://demoqa.com/');
        cy.get('div.card-body h5').contains('Elements').click();
        cy.get('div.element-group div.header-text').contains('Alerts, Frame & Windows').click();
        cy.get('li span.text').contains('Alerts').click();
    })

    it('verify window:alert', function () {
        cy.get('#alertButton').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You clicked a button');
        })
    })

    it('verify window:confirm', function () {
        cy.get('#confirmButton').click();
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Do you confirm action?');
        })
        cy.get('#confirmResult').contains('You selected Ok');
    })

    it('Handling JS Confirm - Click Cancel', () => {
        cy.get('#confirmButton').click();
        cy.on('window:confirm', () => false)
        cy.get('#confirmResult').contains('You selected Cancel')
    })

    it('verify window:prompt after clicking cancel', function () {

        cy.window().then(win => {
            cy.get('#promtButton').click();
            cy.stub(win, 'prompt').callsFake(() => null);
        })
        cy.get('#promptResult').should('not.exist')
    })

    it('verify window:prompt', function () {
        cy.window().then(function (name) {
            // click on Click for JS Prompt button
            cy.get('#promtButton').click();

            //stubbing prompt window
            cy.stub(name, "prompt").returns("Maria");

            // verify application message on clicking on OK
            cy.get('#promptResult').contains('You entered Maria');
        });
    })
})

