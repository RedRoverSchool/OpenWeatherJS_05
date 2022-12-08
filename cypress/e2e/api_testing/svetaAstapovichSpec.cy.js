/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID

describe("API test suit", () => {

    describe("Create Booking", () => {

        const postBooking = () => 
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
    
    
        it('verify response creates booking', () => {
            postBooking()
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                CREATED_ID = response.bookingid
                console.log('CREATED_ID = ', CREATED_ID)
            })
        })

        it.skip('verify response has key bookingid', () => {
            getResponse()
            .its('body')
            .then(response => {
                //expect(response.body.booking.lastname).to.equal('Brown') // without its
                //expect(response.status).to.eq(200)
                expect(response.booking.lastname).to.equal('Brown')
                expect(response.booking.totalprice).to.be.a('number')
            })
        })  
    });

    describe('Get Booking Id', () => {
        
        const getBookingIDs = () => cy.request(`${API_BASE_URL}/booking`)

        it('Verify response status', () => {
            getBookingIDs()
            .then(({status}) => {
            expect(status).to.eq(200)
            })
        })
    });
})
