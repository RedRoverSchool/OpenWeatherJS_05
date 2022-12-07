/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

describe("Api test suit", () => {

    describe("Create Booking", () => {

        const createBookingRequest = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/booking`,
                body: {
                    "firstname": "Ben",
                    "lastname": "White",
                    "totalprice": 111,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2018-01-01",
                        "checkout": "2019-01-01"
                    },
                    "additionalneeds": "Breakfast"
                }
            })

        it("verify that request creates booking", () => {
            createBookingRequest()
                .then(response => {
                    expect(response.body.booking.lastname).to.equal('White')
                    expect(response.body.booking.totalprice).to.be.a('number')
                    expect(response.status).to.eq(200)
                })
        })
    })
}) 