/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')

let CREATED_TOKEN
let CREATED_ID

describe('reshetnikovaAlenaSpec', function () {

    describe('Verify creation of token', function () {

        const createToken = () => {
            return cy.request({
                method: "POST",
                headers: apiData.headersContentType,
                body: apiData.admin,
                url: `${API_BASE_URL}/auth`
            })
        }
        it('Verify created token', () => {
            createToken().then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body).to.have.property('token')
                expect(response.body).not.have.property('reason')
                CREATED_TOKEN = response.body.token;
            })
        })
    })

    describe('Verify creation of booking', () => {

        const createBooking = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: apiData.bodyCreateBooking
            })

        it('Verify response has status 200', () => {
            createBooking()
                .its('status')
                .should('be.eq', 200)
        })

        it('Response has key bookingid', () => {
            createBooking()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('bookingid')
                    CREATED_ID = response.bookingid
                    console.log('CREATED_ID = ', CREATED_ID)
                })
        })
    })

    describe('Verify all booking IDs', () => {

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })

        it('Response status', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })

        it('Response has headers', () => {
            getResponse()
                .then(response => {
                    console.log(response)
                    expect(response).to.have.property('headers')
                })
        })

        it('Response body is array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        })
    })
})

