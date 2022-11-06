describe('groupBugBusters', () => {

    beforeEach(() => {
        cy.viewport(1280, 720)
    })

    it('AT_003.001 | Search City', function () {
        cy.visit('https://openweathermap.org')
        cy.get('div#desktop-menu a[href="/guide"]').click()
        cy.get('main.wrapper a[href]:not(.btn-orange)').each(($el) => {
            cy.wrap($el).should('have.css', 'color').and('eq', 'rgb(233, 110, 80)');
        })
    })
})     
