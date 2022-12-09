/// <reference types="cypress"/>

const apiData = require('../../fixtures/apiData.json')
const API_BASE_URL = Cypress.env('apiBaseUrl')
let BOOKING_ID

describe("annaIurchykSpec", () => {

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
        })

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


    describe.only('Create Booking', () => {
        
        const createBooking = () => 
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            headers: {
                "Content-Type": "application/json"
            },
            body: apiData.createBookingInfo
        })

        const getBookingId = () => 
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`
        })

        const partialUpdateBooking = () => 
        cy.request({
            method: "PATCH",
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
            },
            body: apiData.newInformation
        })

        const deleteBooking = () =>
        cy.request({
            method: "DELETE",
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
            }
        })

        it('Verify booking has Booking ID', () => {
            createBooking()
            .then(response => {
                expect(response.body).has.property('bookingid')
                BOOKING_ID = response.body.bookingid
                console.log(BOOKING_ID)
            })
        })

        it('Verify Last Name is the right in the POSTed booking', () => {
            getBookingId()
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.lastname).to.eq(apiData.createBookingInfo.lastname)
            })
        })

        it('Verify response body is an object', () => {
            getBookingId()
                .its('body')
                .should('be.an', 'object')
        })

        it('Verify booking has First and Last Name', () => {
            getBookingId()
            .then(response => {
                expect(response.body).has.property('firstname', apiData.createBookingInfo.firstname)
                expect(response.body).has.property('lastname', apiData.createBookingInfo.lastname)
            })
        })

        it('Verify booking has Status 200', () => {
            getBookingId()
            .then(response => {
                expect(response.status).to.eq(200)
            })
        })

        it('Verify booking status after partial update is 200', () => {
            partialUpdateBooking()
            .then(response => {
                expect(response.status).to.eq(200)
            })
        })

        it('Verify Last Name at the booking after partial update', () => {
            partialUpdateBooking()
            .then(response => {
                expect(response.body).has.property('lastname', apiData.newInformation.lastname)
            })
        })

        it('Verify Total Price at the booking after partial update', () => {
            partialUpdateBooking()
            .then(response => {
                expect(response.body).has.property('totalprice', apiData.newInformation.totalprice)
            })
        })

        it('Delete Booking', () => {
            deleteBooking()
            .then(response => {
                expect(response.body).to.eq(apiData.responsebobyafterdeletebooking)
            })
        })
    })
})