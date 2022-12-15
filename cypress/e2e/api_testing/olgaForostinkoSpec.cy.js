/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID 

describe("OlgaForostinkoSpec", () => {

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

        it('Verify response status',() => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('Verify response has headers', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('headers')
            })
        })

        it('Verify response statusText', () => {
            getResponse()
            .then(response => {
                console.log(response.statusText)
            })
        })

        it('Verify response has requestHeaders', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('requestHeaders')
            })
        })

        it('Verify response body is an array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        });

        it('Verify response body has BookingId', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.property('bookingid')
            })
        })

        it('Verify response body has a duration', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('duration')
            })
        })

        it('Verify tatus - anoter option', () => {
            getResponse()
            .then(response => {
                expect(response).to.have.property('status', 200)   
            })  
        })
        
        describe('Create New Booking', () => {

            const getResponse = () => 
                cy.request({
                    method: "POST",
                    url: `${API_BASE_URL}/booking`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        "firstname" : "Elon",
                        "lastname" : "Musk",
                        "totalprice" : 1150,
                        "depositpaid" : true,
                        "bookingdates" : {
                            "checkin" : "2023-01-01",
                            "checkout" : "2023-01-05"
                        },
                        "additionalneeds" : "Breakfast"
                    }
                })
            
            it('print response', () => {
                getResponse()
                .then(response => {
                    console.log(response.body)
                    expect(response.status).to.eq(200)
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
})