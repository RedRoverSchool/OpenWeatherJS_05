/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let BOOKING_ID
let TOKEN

describe('kateRomankovaSpec', () => {

    const createBooking = () =>
		cy.request({
			method: "POST",
			url: `${API_BASE_URL}/booking`,
			headers: apiData.headersContentType,
			body: apiData.createBookingInfo
		})  

    const updateBooking = () =>
		cy.request({
			method: "PATCH",
			url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
			headers: apiData.headersForUpdate,
            body: {
                "lastname" : apiData.newInformation.lastname,
                "totalprice" : apiData.newInformation.totalprice
            }
		})

    const getResponseWithToken = () => 
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth`,
            body: apiData.admin
        })

    const deleteBooking = () =>
        cy.request({
            method: "DELETE",
            url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            headers: {
                "Content-Type": "application/json", "Cookie": `token = ${TOKEN}`
            }
       })

    describe("Update booking", () => {

        it('create booking', () => {
            createBooking()
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.booking).has.property('firstname',  apiData.createBookingInfo.firstname)
                expect(response.body.booking).has.property('lastname', apiData.createBookingInfo.lastname)
                expect(response.body.booking).has.property('totalprice', apiData.createBookingInfo.totalprice)
                BOOKING_ID = response.body.bookingid
            })
        })

        it ('verify status of created bookingid', ()  => {
            cy.request( "GET", `${API_BASE_URL}/booking/${BOOKING_ID}`)
             .then(response => {
                expect(response.status).to.equal(apiData.statusOk)
            })
        })

        it('update information', () => {
            updateBooking()
            .then(response => {
                expect(response.status).to.equal(apiData.statusOk)
                expect(response.body).has.property('firstname', apiData.createBookingInfo.firstname)
                expect(response.body).has.property('lastname', apiData.newInformation.lastname)
                expect(response.body).has.property('totalprice', apiData.newInformation.totalprice)
            })          
        })
    })

    describe('delete booking', () => {
       
       it('create bookingID', () => {
            createBooking() 
                .then(response => {
                    expect(response.status).to.equal(apiData.statusOk)
                    BOOKING_ID = response.body.bookingid
                })           
        })

        it('verify response body has key token and send it to the global variable TOKEN', () => {
			getResponseWithToken()
				.then(response => {
					expect(response.body).to.have.key(apiData.artData.token)
					TOKEN = response.body.token
				})
		})

        it('delete booking', () => {
            deleteBooking()
                .then(response => {
                    expect(response.status).to.equal(apiData.responsestatusafterdeletebooking)
                    expect(response.body).to.equal(apiData.responsebobyafterdeletebooking)
                })          
        })

        it('verify there is not the created ID', function () {
            cy.request({
                method: 'GET',
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(apiData.artData.forDelete.code404)
            })          
        })
    })

    describe('Create Booking', () => {
            
        it('check status', () => {
            createBooking()
                .then(response => {
                    expect(response.status).to.equal(apiData.statusOk)
                })
        })

        it('verify that booking created', () => {
            createBooking()
                .then(response => {
                    expect(response.body.booking).has.property('firstname', apiData.createBookingInfo.firstname)
                    expect(response.body.booking).has.property('lastname', apiData.createBookingInfo.lastname)
                    expect(response.body).to.have.property(apiData.lapData.correctDataReponseProperties.obj[1])
                })               
        })

        it('verify that total price value is number', () => {
            createBooking() 
                .then(response => {
                    expect(response.body.booking.totalprice).to.be.a(apiData.lapData.correctBookingItems.totalprice)
                })
        })

        it('verify that total price', () => {
            createBooking() 
                .then(response => {
                    expect(response.body.booking.totalprice).to.be.equal(apiData.createBookingInfo.totalprice)
                })
        })
    })   
})
