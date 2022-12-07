/// <reference types="cypress"/>

 import api from '../../fixtures/apiData.json'

 const apiBooking = api
 const API_BASE_URL = Cypress.env('apiBaseUrl')
 let BOOKING_ID

 describe("API with Cypress", () => {

    const getResponse = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "firstname": apiBooking.createBookingInfo.firstname,
                "lastname": apiBooking.createBookingInfo.lastname,
                "totalprice": apiBooking.createBookingInfo.totalprice,
                "depositpaid": apiBooking.createBookingInfo.depositpaid,
                "bookingdates": {
                    "checkin": apiBooking.createBookingInfo.checkin,
                    "checkout": apiBooking.createBookingInfo.checkout
                },
                "additionalneeds": apiBooking.createBookingInfo.additionalneeds

            }
        })

    it('API | Print response status: create booking confirmation', () => {
        getResponse()
            .then(response => {
                console.log(response)
                expect(response.status).to.equal(200)
            })
    })

    it('API Verify response:  created booking has fileds bookingid and object booking ', () => {
        getResponse()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                BOOKING_ID = response.bookingid
                cy.log('BOOKING_ID = ' + BOOKING_ID)

                expect(response).to.have.any.keys('booking')
                expect(response.booking.firstname).to.eq(apiBooking.createBookingInfo.firstname)
                cy.log('Name: ' + response.booking.firstname + " " + response.booking.lastname)
                cy.log('Dates: ' + response.booking.bookingdates.checkin + "-" + response.booking.bookingdates.checkin)
                cy.log('Options: ' + response.booking.additionalneeds)
            })
    })
})