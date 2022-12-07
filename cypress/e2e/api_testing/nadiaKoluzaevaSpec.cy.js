/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID
let CREATED_TOKEN

describe("API with Cypress", () => {

    describe("Get all BookingIds", () => {

        const getResponse = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })
        
        it('verify response status', () => {
                getResponse()
                .its('status')
                .should('be.eq', 200)
            })
    
        it('verify response has body', () => {
            getResponse()
            .then(response => {
                console.log(response)
                expect(response).to.have.property('body')
            })
        })
       
        it('verify body response is not an empty', () => {
            getResponse()
            .its('body')
            .should('not.be.empty')
        })

        it('verify bokingid satisfy numbers', () => {
            getResponse()
            .its('body')
            .then(response => {
            expect(response[0].bookingid).to.satisfy((num) => { return num > 0 })
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

    describe("Create Token", () => {

        const getResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/auth`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                        "username" : "admin",
                        "password" : "password123"
                    }
            })

        it('verify response has body', () => {
            getResponse()
            .then(response => {
                console.log(response)
                expect(response).to.have.property('body')
        })
    })

        it('save token key to variable', () => {
            getResponse()
            .then(response => {
                expect(response.status).to.equal(200)
                    CREATED_TOKEN = response.body.token
                    console.log('CREATED_TOKEN = ', CREATED_TOKEN)
            
        })
    })  
})
})
})
