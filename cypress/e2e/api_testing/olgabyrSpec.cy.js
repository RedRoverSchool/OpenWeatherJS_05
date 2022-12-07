/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID

describe("Delete booking", () => {

	const getResponse = () =>
		cy.request({
			method: "POST",
			url: `${API_BASE_URL}/booking`,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				"firstname": "Jim",
				"lastname": "Brown",
				"totalprice": 111,
				"depositpaid": true,
				"bookingdates": {
					"checkin": "2018-01-01",
					"checkout": "2019-01-01"
				},
				"additionalneeds": "Breakfast"
			}
		})

	const deleteBooking = () =>
		cy.request({
			method: "DELETE",
			url: `${API_BASE_URL}/booking/${CREATED_ID}`,
			headers: {
				"Content-Type": "application/json", "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
			}
		})

	it('creat an booking and check its status', () => {
		getResponse()
			.then(response => {
				expect(response.status).to.equal(200)
			})
	})

	it('verify created response has key bookingid', () => {
		getResponse()
			.its('body')
			.then(response => {
				expect(response).to.have.any.keys('bookingid')
				CREATED_ID = response.bookingid
			})
	})

	it('delete created booking', () => {
		deleteBooking()
			.then(response => {
				expect(response.status).to.equal(201)
			})
	})
})
