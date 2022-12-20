/// <reference types="cypress"/>


const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let CREATED_ID
let CREATED_TOKEN


describe('NinaPrud API tests Cypress', () => {

    describe('Create Token', () => {

        const createToken = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/auth`,
                headers: apiData.headersContentType,
                body: apiData.admin
            });

        it('verify created token', () => {
            createToken()
                .then(({ body }) => {
                    expect(body).to.have.keys('token')
                    CREATED_TOKEN = body.token
                    console.log(`Token is ${CREATED_TOKEN}`)
                });
        });
    });

    describe('Create Booking', () => {

        const createBooking = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/booking`,
                headers: apiData.headersContentType,
                body: apiData.bodyCreateBooking
            });

        it('verify response has key bookingid', () => {
            createBooking()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('bookingid')
                    CREATED_ID = response.bookingid
                    console.log(`Created booking is `)
                    console.log(response)
                })
        })
    });

    describe('Get Booking', () => {

        const getResponse = () =>
            cy.request({
                method: 'GET',
                url: `${API_BASE_URL}/booking/${CREATED_ID}`
            })

        it('verify response status', () => {
            getResponse()
                .then(({ status }) => {
                    expect(status).to.eq(200)
                })
        });

        it('verify respons has expected keys', () => {
            getResponse()
                .then(({ body }) => {
                    expect(body)
                        .to.have.all.keys(apiData.arrOfBodyKeys)
                })
        });

        it('verify depositpaid is true', () => {
            getResponse()
                .then(({ body }) => {
                    expect(body.depositpaid).to.eq(true)
                })
        });

        it('verify totalprice is number', () => {
            getResponse()
                .then(({ body }) => {
                    expect(body.totalprice).to.be.a('number')
                })
        });
    });

    describe('Delete Created Booking', () => {

        const deleteBooking = () =>
            cy.request({
                method: 'DELETE',
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token = ${CREATED_TOKEN}`
                },
            });

        it('verify delete status', () => {
            deleteBooking()
                .then(response => {
                    expect(response.status).to.eq(201)
                    console.log('Created booking is delete')
                })
        });

        it('verify booking is delete', () => {
            cy.request({
                method: 'GET',
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                failOnStatusCode: false
            }).then(({ status }) => {
                expect(status).to.eq(404)
            })
        });
    });
});