/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('https://restful-booker.herokuapp.com')
const apiData = require('../../fixtures/apiData.json')
let CREATED_ID
let TOKEN

describe('olgabyrSpec', () => {

	describe("Create booking", () => {

		const postResponse = () =>
			cy.request({
				method: "POST",
				url: "https://restful-booker.herokuapp.com/booking",
				headers: {
					"Content-Type": "application/json"
				},
				body: {
					"firstname": apiData.firstname,
					"lastname": apiData.lastname,
					"totalprice": apiData.totalprice,
					"depositpaid": apiData.depositpaid,
					"bookingdates": {
						"checkin": apiData.bookingdates.checkin,
						"checkout": apiData.bookingdates.checkout
					},

					"additionalneeds": apiData.additionalneeds
				}
			})

		it('creat booking and verify response status', () => {
			postResponse()
				.then(response => {
					expect(response.status).to.equal(200)
				})
		})

		it('verify response has key "bookingid"', () => {
			postResponse()
				.then(response => {
					expect(response.body).to.have.any.keys('bookingid')
					CREATED_ID = response.body.bookingid
				})
		})
	})

	describe('Create token', () => {

		const createToken = () =>
			cy.request({
				method: "POST",
				url: "https://restful-booker.herokuapp.com/auth",
				headers: {
					"Content-Type": "application/json"
				},
				body: {
					"username": apiData.usernamefortokenauthorization,
					"password": apiData.passwordfortokenauthorization
				}
			})

		it('Verify response status code is 200', () => {
			createToken()
				.then(response => {
					expect(response.status).to.equal(200);
				})
		})

		it('Verify response body has key token and send it to the global variable TOKEN', () => {
			createToken()
				.then(response => {
					expect(response.body).to.have.key('token')
					TOKEN = response.body.token
				})
		})
	})

	describe('Delete booking', () => {

		it('delete created booking using authorization token', () => {
			cy.request({
				method: "DELETE",
				url: `https://restful-booker.herokuapp.com/booking/${CREATED_ID}`,
				headers: {
					"Content-Type": "application/json", "Cookie": `token = ${TOKEN}`
				}
			}).then(response => {
				expect(response.status).to.equal(201)
				expect(response.body).to.equal(apiData.responsebobyafterdeletebooking)
			})
		})
	})
})
