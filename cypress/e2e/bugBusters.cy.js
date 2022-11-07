describe('groupBugBusters', () => {

    beforeEach(() => {
        cy.viewport(1280, 720)
    })

    it('AT_003.001 | Search City', function () {
        cy.visit('https://openweathermap.org')
        cy.get('div#desktop-menu a[href*="marketplace"]').click()
        cy.get('div.market-place a[href]:not(.button-round)').each(($el) => {
            cy.wrap($el).should('have.css', 'color').and('eq', 'rgb(235, 110, 75)');
        })
    })
})     
