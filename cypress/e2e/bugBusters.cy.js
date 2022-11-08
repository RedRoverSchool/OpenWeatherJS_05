describe('groupBugBusters', () => {

    it('AT_016.001 | Verify all links has the same orange color on the page', function () {
        cy.visit('https://openweathermap.org')
        cy.get('div#desktop-menu a[href*="marketplace"]').invoke('removeAttr', 'target').click()
        //doesn't work
        // cy.get('div.market-place a[href]:not(.button-round)').eq(1).as('secondLink')
        // cy.log(cy.get('@secondLink').text())

        // Находим текст одного из элементов массива
        cy.get('div.market-place a[href]:not(.button-round)').eq(0).then(($el) => {
            let link1Text = $el.text()
            cy.log(link1Text)
        })

        //Пробегаем по всему массиву веб элементов
        cy.get('div.market-place a[href]:not(.button-round)').each(($el) => {
            // cy.log($el.text())
            cy.wrap($el).should('have.css', 'color', 'rgb(235, 110, 75)');
        })
    })
})     
