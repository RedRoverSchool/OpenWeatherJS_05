/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let CREATED_ID
let CREATED_TOKEN 
let CREATED_NEW_ID
let CREATED_NEW_TOKEN

describe("lauraBSpec", () => {

    describe("Get all BookingIds", () => {

        const getResponse = () => 
            cy.request({
                method: "GET",
                url:  `${API_BASE_URL}/booking` 
        })
    
        it('GET all bookings', () => {
            getResponse()
            .its('status')
            .then(response => {
                console.log(`response for bookings = ${response}`)
             })
        })

        it('verify response has headers', () => {
            getResponse()
            .then(response => {
                console.log(`response for headers = ${response}`)
                expect(response).to.have.property('headers')
            })
        })

        it('verify response status', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('verify response is array', () => {
            getResponse()
            .its('body')
            .should('be.an', 'array')
        })

        it('verify response contains object with key bookingid', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.keys('bookingid')
            })
        })

        it('verify response contains body with promise then', () =>{
            getResponse()
            .then(({body}) => {
                expect(body[0]).to.have.keys('bookingid')
            })
        })

        it('verify response status with promise then', () => {
            getResponse()
            .then(({status}) => {
                expect(status).to.equal(200)
                cy.log(status)
            })
        })

        it('verify response status 200', () => {
            getResponse()
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.log(response.body)
            })
        })
    })

    describe('Create booking', () => {

        const getResponse = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "firstname" : "Jim",
                    "lastname" : "Brown",
                    "totalprice" : 111,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
                }
            })
        
        it('verify response has headers', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('verify response has headers and print response', () => {
            getResponse()
            .then(response => {
                console.log(`response has headers = ${response}`)
                console.log(`response.body = ${response.body}`)
                expect(response.status).to.equal(200)
            })
        })

        it('verify response has key bookingid', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                CREATED_ID = response.bookingid
                console.log('CREATED_ID = ', CREATED_ID)
            })
        })
    })

    describe('Get booking by filter lastname', () => {

        const filterByLastName = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking?lastname=${API_DATA.lastname}`
            })

        it('verify status filter response', () => {
            filterByLastName()
            .then(response => {
                expect(response.status).to.equal(200)
            })
        })
    })

    describe('create token', () => {

        const createToken = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/auth`,
                headers: API_DATA.headersContentType,
                body: API_DATA.admin
            })
        
        it('verify created token', () => {
            createToken()
            .then(response => {
                expect(response.body).to.have.keys('token')
                CREATED_TOKEN = response.body.token
                console.log(`CREATED_TOKEN = ${CREATED_TOKEN}`)
            })
        })
    })

    describe('delete created bookingid', () => {

        const deleteBookingId = () => 
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${CREATED_TOKEN}`
                }
            })

        const getCodeStatus = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                failOnStatusCode: false
            })

        it('delete created bookingid', () => {
            deleteBookingId() 
            .then(response => {
                expect(response.status).to.equal(201)
            })
        })

        it('verify created bookingid has been deleted', () => {
            getCodeStatus()
            .then(response => {
                expect(response.status).to.eq(404)
                cy.log(`result of deleted booking = ${response.status}`)
                console.log(`result of deleted booking = ${response.status}`)
            })
        })
    })

    describe('Get bookingid filter by checkin/checkout date', () => {

        const getResponse = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/booking`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "firstname": "Sally",
                    "lastname": "Brown",
                    "totalprice": 111,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2013-03-24",
                        "checkout": "2014-11-24"
                    },
                    "additionalneeds": "Breakfast"
                }
            })

        const filterByDate = () =>
            cy.request({
                method: 'GET',
                url: `${API_BASE_URL}/booking?checkin=2013-03-24&checkout=2014-11-24`
            })

        it('verify response has headers', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })

        it('verify status filter by date response', () => {

            filterByDate()
            .then(response => {
                expect(response.status).to.equal(200)
            })
        })
    })
  
    describe('get server response with ping', () => {
        
        const getResponseOfServer = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/ping`
            })

        it('verify server response with ping', () => {
            getResponseOfServer()
            .its('status')
            .should('be.eq', 201)
        })
    })
})