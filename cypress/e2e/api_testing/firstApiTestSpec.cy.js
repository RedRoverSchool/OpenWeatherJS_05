/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID

describe("API with Cypress", () => {

    describe("Get all BookingIds", () => {

        const getResponse = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })
    
    
        it('verify response has headers', () => {
            getResponse()
            .then(response => {
                console.log(response)
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
    })

    describe("Create Booking", () => {

        const getResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
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
    
    
        it('print response ', () => {
            getResponse()
            .then(response => {
                console.log(response)
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
})
