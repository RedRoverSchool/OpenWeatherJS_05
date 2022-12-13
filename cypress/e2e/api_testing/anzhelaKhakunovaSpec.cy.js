/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const apiData = require('../../fixtures/apiData.json')

let BOOKING_ID
let TOKEN

describe('API | AnzhelaKhakunovaSpec ', () => {
    
    const createBooking = () =>
			cy.request({
				method: "POST",
				url: `${API_BASE_URL}/booking`,
				headers: apiData.headersContentType,
				body: apiData.anzhelaData.createBooking
			});

    const createToken = () =>
			cy.request({
				method: "POST",
				url: `${API_BASE_URL}/auth`,
				headers: apiData.contentTypeHeader,
				body: {
					"username": apiData.admin.username,
					"password": apiData.admin.password
				}
			});

    const updateBooking = () => 
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": apiData.headersContentType['Content-Type'],
                    "Accept": apiData.headersAccept.Accept,
                    "Cookie": `token = ${TOKEN}`
                },
                body: apiData.anzhelaData.updateBooking
            });

    const deleteBooking = () => 
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": apiData.headersContentType['Content-Type'],
                    "Cookie": `token = ${TOKEN}`
                }
            })

    describe('Authorization', () => {

        it('Verify authorization response status code', () => {
            createToken()
            .then((response) => {
                expect(response.status).to.equal(200)
            })
        });
        
        it('Verify token is created', () => {
            createToken()
            .then((response) => {
                expect(response.body).to.have.key('token')
                TOKEN = response.body.token
            })
    
        });
        
    });

    describe('Create new booking', () => {

        it('Verify response status', () => {
            createBooking()
            .then((response) => {
                expect(response.status).to.equal(200)
            })
            
        });

        it('Verify and save "bookingid" key', () => {
            createBooking()
            .then((response) => {
                expect(response.body).to.have.any.keys('bookingid')
                BOOKING_ID = response.body.bookingid
            })
        });
        
    });

    describe('Update booking', () => {

        it('Verify update response status code', () => {
            updateBooking()
            .then((response) => {
                expect(response.status).to.equal(200)
            })
        });

        it('Verify booking is updated', () => {
            updateBooking()
            .then((response) => {
                expect(response.body).eql(apiData.anzhelaData.updateBooking)
            })
        });

        it('Verify status code is 403 when missing token', () => {
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
					"Content-Type": apiData.headersContentType['Content-Type'],
                    "Accept": apiData.headersAccept.Accept
				},
                failOnStatusCode: false,
                body: apiData.anzhelaData.updateBooking
            }).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body).to.equal('Forbidden')
            })
        });

        it('Verify status code is 403 when missing request headers', () => {
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                failOnStatusCode: false,
                body: apiData.anzhelaData.updateBooking
            }).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body).to.equal('Forbidden')
            })
        });

        it('Verify status code is 400 when missing request body', () => {
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": apiData.headersContentType['Content-Type'],
                    "Accept": apiData.headersAccept.Accept,
                    "Cookie": `token = ${TOKEN}`
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body).to.equal('Bad Request')
            })
        });

        it('Verify status code is 400 when sending request without first name body field', () => {
            cy.request({
            method: "PUT",
                url: `https://restful-booker.herokuapp.com/booking/${BOOKING_ID}`,
                headers: {
                    "Content-Type": apiData.headersContentType['Content-Type'],
                    "Accept": apiData.headersAccept.Accept,
                    "Cookie": `token = ${TOKEN}`
                },
                body: {                    
                    "lastname": "Roark",
                    "totalprice": 349,
                    "depositpaid": true,
                    "bookingdates": {
                       "checkin": "2022-01-01",
                       "checkout": "2023-01-01"
                    },
                    "additionalneeds": "Car rental"            
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(400)
            })
        });
    });

    describe('Delete created booking using authorization token', () => {

        it('Verify status code when booking is deleted', () => {
            deleteBooking()
            .then((response) => {
                expect(response.status).to.equal(201)
            })
        });       
    });
})