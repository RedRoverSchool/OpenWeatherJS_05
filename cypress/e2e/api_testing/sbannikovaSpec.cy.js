/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let CREATED_ID

describe("Partially update booking", () => {

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
			url: `${API_BASE_URL}/booking/${CREATED_ID}`,
			headers: {
				"Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
			},
            body: {
                "firstname": "Matias",
            }
		})

	it('creat an booking and check its status', () => {
		createBooking()
			.then(response => {
				expect(response.status).to.equal(200)
			})
	})

	it('verify created response has key bookingid', () => {
		createBooking()
			.its('body')
			.then(response => {
				expect(response).to.have.any.keys('bookingid')
				CREATED_ID = response.bookingid
			})
	})

	it ('verify status of created bookingid', ()  => {
		cy.request( "GET", `${API_BASE_URL}/booking/${CREATED_ID}`)
		 .then(response => {
			expect(response.status).to.equal(200)
		})
	})

	it('partially update booking', () => {
		updateBooking()
			.then(response => {
				expect(response.status).to.equal(200)
			})
	})

})
