/// <reference types="cypress"/>


const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID
let KEYS = ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates", "additionalneeds"]


describe('NinaPrud API tests Cypress', () => {

    describe('Create Booking', () => {

        const createBooking = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/booking`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "firstname": "Nina",
                    "lastname": "Smith",
                    "totalprice": 2121,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2023-01-01",
                        "checkout": "2023-01-01"
                    },
                    "additionalneeds": "Breakfast"
                }
            });

        it('verify response has key bookingid', () => {
            createBooking()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('bookingid')
                    CREATED_ID = response.bookingid
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
                .then(({status}) => {
                    expect(status).to.eq(200)
                })
        });

        it('verify respons has expectde keys', () => {
            getResponse()
                .then(({body}) => {
                    expect(body)
                        .to.have.all.keys(KEYS)
                })
        });

        it('verify depositpaid is true', () => {
            getResponse()
                .then(({body}) => {
                    expect(body.depositpaid).to.eq(true)
                })
        });

        it('verify totalprice is number', () => {
            getResponse()
                .then(({body}) => {
                    expect(body.totalprice).to.be.a('number')
                })

        });
    });
});