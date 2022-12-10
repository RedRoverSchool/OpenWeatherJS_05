/// <reference types="cypress"/>

import api from '../../fixtures/apiData.json'

const apiBooking = api
const API_BASE_URL = Cypress.env('apiBaseUrl')
let BOOKING_ID
let TOKEN_AUTH
const getResponseGetBookingByID = () =>
cy.request({
    method: "GET",
    url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
    headers: {
        "Content-Type": "application/json"
    },
    failOnStatusCode: false
})

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

    describe('3. Get booking by ID', () => {

        it('Verify response status Get booking id = 200 and header', () => {
            getResponseGetBookingByID()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(200)
                    assert.isObject(response.headers)
                    assert.isOk(response.statusText)
                    assert.isTrue(response.isOkStatusCode)
                    expect(response.headers['content-type']).to.eq("application/json; charset=utf-8")
               })
        })

        it('Verify body response and headers Get booking ID ', () => {
            getResponseGetBookingByID()
                .its('body')
                .then((response) => {
                     expect(response).to.have.any.keys('additionalneeds')
                    expect(response).to.have.any.keys('firstname')
                    expect(response.firstname).to.eq(apiBooking.updateBookingInfo.firstname)
                    expect(response.lastname).to.eq(apiBooking.updateBookingInfo.lastname)
                    expect(response.totalprice).to.be.a('number')
                    expect(response.additionalneeds).to.eq(apiBooking.updateBookingInfo.additionalneeds)
                    expect(response.bookingdates.checkin).to.eq(apiBooking.updateBookingInfo.bookingdates.checkin)
                })
        })
    })

    describe("4. Delete booking information", () => {

        const getResponseDelete = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": "token=" + TOKEN_AUTH
                }
            })

        it('Verify response status Delete booking - confirmation', () => {
            getResponseDelete()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(201)
                    expect(response.statusText).to.equal("Created")
                })
        })

        it('Verify response status Get booking id is 404 ("Not found") after DELETE', () => {
            getResponseGetBookingByID()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(404)
                    assert.equal(response.statusText,"Not Found")
                    assert.isFalse(response.isOkStatusCode)
              })
        })
    })

})