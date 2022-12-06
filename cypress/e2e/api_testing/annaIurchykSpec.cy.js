/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

describe("API Tests with Cypress", () => {

    describe("Get BookingId Tests", () => {

        const getResponse = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })

        it('Verify response has a body', () => {
            getResponse()
            .then(response => {
                console.log(response)
                expect(response).to.have.property('body')
            })
        })

        it('Verify response body is an array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        });

        it('Verify response body has a duration', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('duration')
            })
        })

        it('Verify response has headers', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('headers')
            })
        })

        it('Verify response Headers Server is Cowboy ', () => {
            getResponse()
            .then(response => {
                expect(response.headers.server).to.eq('Cowboy')
            })
        })

        it('Verify response Headers Connection is keep-alive ', () => {
            getResponse()
            .then(response => {
                expect(response.headers.connection).to.eq('keep-alive')
            })
        })

        it('Verify response status',() => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('Verify response body has BookingId', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.property('bookingid')
            })
        })
    })
})