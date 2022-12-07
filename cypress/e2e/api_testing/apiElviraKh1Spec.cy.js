/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID

let firsNname = "Kia"
let lastName = "Motors"
let totalPrice =200
let checkIn = "2020-03-15"
let checkOut = "2021-03-15"
let additionalNeeds = "Parking"

describe("API with Cypress", () => {

        const getResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : firsNname,
                    "lastname" : lastName,
                    "totalprice" : totalPrice,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : checkIn,
                        "checkout" : checkOut
                    },
                    "additionalneeds" : additionalNeeds
                }
            })

    
    
        it('API | Print response: Create booking', () => {
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
                expect(response).to.have.any.keys('booking.firstname')
                console.log('First Name: ', response.booking.firstname)
                expect(response).to.have.any.keys('booking.bookingdates.checkin')
                console.log('Date: ', response.booking.bookingdates.checkin)
                
            })
        })  
    })
})
