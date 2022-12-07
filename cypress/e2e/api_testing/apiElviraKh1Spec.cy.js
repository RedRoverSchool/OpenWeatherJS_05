/// <reference types="cypress"/>

 import api from '../../fixtures/apiData.json'

 const apiBooking = api
 const API_BASE_URL = Cypress.env('apiBaseUrl')
 let BOOKING_ID
 let TOKEN_AUTH

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
                expect(response.booking.firstname, apiBooking.createBookingInfo.firstname)
                cy.log('Name: ' + response.booking.firstname + " " + response.booking.lastname)
                cy.log('Dates: ' + response.booking.bookingdates.checkin + "-" + response.booking.bookingdates.checkin)
                cy.log('Options: ' + response.booking.additionalneeds)
            })
    })
})

describe("API get token and update booking information (first name and additional needs)", () => {
    const getResponseAuth = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth/`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username": apiBooking.admin.username,
                "password": apiBooking.admin.password,
            }
        })

    it('API get status for create auth token', () => {
        getResponseAuth()
            .then(response => {
                console.log(response)
                expect(response.status).to.equal(200)
            })
    })

    it('API get token', () => {
        getResponseAuth()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('token')
                cy.log('TOKEN = ' + response.token)
                TOKEN_AUTH = response.token
            })
    })

    const getResponse = () =>
        cy.request({
            method: "PUT",
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            headers: {
                "Content-Type": "application/json",
                "Cookie": "token=" + TOKEN_AUTH
            },
            body: {
                "firstname": apiBooking.updateBookingInfo.firstname,
                "lastname": apiBooking.updateBookingInfo.lastname,
                "totalprice": apiBooking.updateBookingInfo.totalprice,
                "depositpaid": apiBooking.updateBookingInfo.depositpaid,
                "bookingdates": {
                    "checkin": apiBooking.updateBookingInfo.checkin,
                    "checkout": apiBooking.updateBookingInfo.checkout
                },
                "additionalneeds": apiBooking.updateBookingInfo.additionalneeds
            }
        })

    it('API | Print response status: update booking confirmation', () => {
        getResponse()
            .then(response => {
                console.log(response)
                expect(response.status).to.equal(200)
            })
    })

    it('API Verify response:  update booking firsttname and additionalNeeds were changed ', () => {
        getResponse()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('additionalneeds')
                expect(response).to.have.any.keys('firstname')
                expect(response.firstname, apiBooking.updateBookingInfo.firstname)
                cy.log('Updated Name: ' + response.firstname + " " + response.lastname)
                cy.log('Updated Options: ' + response.additionalneeds)
            })
    })
})