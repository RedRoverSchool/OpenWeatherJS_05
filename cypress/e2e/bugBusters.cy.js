describe('groupBugBusters', () => {

    beforeEach(() => {
        cy.viewport(1280, 720)
    })

    it('AT_016.001 | Verify all links has the same orange color on the page', function () {
        cy.visit('https://openweathermap.org')
        cy.get('div#desktop-menu a[href*="marketplace"]').invoke('removeAttr', 'target').click()
        cy.get('div.market-place a[href]:not(.button-round)').each(($el) => {
            cy.wrap($el).should('have.css', 'color').and('eq', 'rgb(235, 110, 75)');
        })
    })
})     
