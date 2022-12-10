/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

describe("API with Cypress", () => {

    describe("Get all BookingIds", () => {

        const getResponse = () => 
            cy.request({
                method: "GET",
                url:  `${API_BASE_URL}/booking` 
        })
    
        it('GET all bookings', () => {
            getResponse()
            .its('status')
            .then(response => {
                console.log(response)
             })
        })

        it('verify response has headers', () => {
            getResponse()
            .then(response => {
                console.log(response)
                expect(response).to.have.property('headers')
            })
        })

        it('verify response status', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('verify response is array', () => {
            getResponse()
            .its('body')
            .should('be.an', 'array')
        })
    })

})


