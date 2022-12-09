/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let BOOKING_ID
let TOKEN

describe('kateRomankovaSpec', () => {

    describe("Update booking", () => {

        const createBooking = () =>
		cy.request({
			method: "POST",
			url: `${API_BASE_URL}/booking`,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
                "firstname" : apiData.firstname,
                "lastname" : apiData.lastname,
                "totalprice" : apiData.totalprice,
                "depositpaid" : apiData.depositpaid,
                "bookingdates" : {
                    "checkin" : apiData.bookingdates.checkin,
                    "checkout" : apiData.bookingdates.checkout
                },
                "additionalneeds" : apiData.additionalneeds
            }
		})  
        
        const updateBooking = () =>
		cy.request({
			method: "PATCH",
			url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
			headers: {
				"Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
			},
            body: {
                "lastname" : apiData.newInformation.lastname,
                "totalprice" : apiData.newInformation.totalprice
            }
		})

        it('create booking', () => {
            createBooking()
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.booking).has.property('firstname',  apiData.firstname)
                expect(response.body.booking).has.property('lastname', apiData.lastname)
                expect(response.body.booking).has.property('totalprice', apiData.totalprice)
                BOOKING_ID = response.body.bookingid
            })
        })

        it ('verify status of created bookingid', ()  => {
            cy.request( "GET", `${API_BASE_URL}/booking/${BOOKING_ID}`)
             .then(response => {
                expect(response.status).to.equal(200)
            })
        })

        it('update information', () => {
            updateBooking()
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body).has.property('firstname', apiData.firstname)
                expect(response.body).has.property('lastname', apiData.newInformation.lastname)
                expect(response.body).has.property('totalprice', apiData.newInformation.totalprice)
            })          
        })
    })
})
