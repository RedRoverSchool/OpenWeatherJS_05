/// <reference types="cypress"/> 


describe('GroupReporters', () => {

    it('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        let inputCity = "$$$"

        cy.visit('https://openweathermap.org')
        cy.get('input[placeholder = "Search city"]').type(inputCity, { force: true })
        cy.get('.search-block button').click()
        cy.get('.sub.not-found')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).")
        cy.get('div.widget-notification').should('have.text', `No results for ${inputCity}`)
    })

    it('AT_005.001 | Verify the website name and description', () => {
        cy.visit('https://openweathermap.org')
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather')
        cy.get('h2 .white-text')
            .should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way')
    })
})
