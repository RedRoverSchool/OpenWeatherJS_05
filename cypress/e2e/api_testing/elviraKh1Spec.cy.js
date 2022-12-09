/// <reference types="cypress"/>

import api from '../../fixtures/apiData.json'

const apiBooking = api
const API_BASE_URL = Cypress.env('apiBaseUrl')
let BOOKING_ID
let TOKEN_AUTH

describe("API | elviraKh1Spec", () => {

    describe("1. Create booking ", () => {

        const getResponseCreate = () =>
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
                        "checkin": apiBooking.createBookingInfo.bookingdates.checkin,
                        "checkout": apiBooking.createBookingInfo.bookingdates.checkout
                    },
                    "additionalneeds": apiBooking.createBookingInfo.additionalneeds

                }
            })

        it('Verify booking confirmation status', () => {
            getResponseCreate()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(200)
                })
        })

        it('Verify created booking has fileds bookingid and object booking ', () => {
            getResponseCreate()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('bookingid')
                    BOOKING_ID = response.bookingid
                    cy.log('BOOKING_ID = ' + BOOKING_ID)

                    expect(response).to.have.any.keys('booking')
                    expect(response.booking.firstname).to.eq(apiBooking.createBookingInfo.firstname)
                })
        })
    })

    describe("2. Get token and update booking information", () => {
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

        it('Verify response status created token', () => {
            getResponseAuth()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(200)
                })
        })

        it('Set token id to TOKEN', () => {
            getResponseAuth()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('token')
                    cy.log('TOKEN = ' + response.token)
                    TOKEN_AUTH = response.token
                })
        })

        const getResponseUpdate = () =>
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": "token=" + TOKEN_AUTH
                },
                body: apiBooking.updateBookingInfo
            })

        it('Verify response status update booking confirmation', () => {
            getResponseUpdate()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(200)
                })
        })

        it('Verify update booking firsttname and additionalNeeds were changed ', () => {
            getResponseUpdate()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('additionalneeds')
                    expect(response).to.have.any.keys('firstname')
                    expect(response.firstname).to.not.eq(apiBooking.createBookingInfo.firstname)
                    expect(response.firstname).to.eq(apiBooking.updateBookingInfo.firstname)
                    expect(response.additionalneeds).to.eq(apiBooking.updateBookingInfo.additionalneeds)
                })
        })
    })
})