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

        it('Verify response status',() => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('Verify response has headers', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('headers')
            })
        })

        it('Verify response statusText', () => {
            getResponse()
            .then(response => {
                console.log(response.statusText)
            })
        })


        it('Verify response has requestHeaders', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('requestHeaders')
            })
        })

        it('Verify response body is an array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        });

        it('Verify response body has BookingId', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.property('bookingid')
            })
        })

        it('Verify response body has a duration', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('duration')
            })
        })
    })
})