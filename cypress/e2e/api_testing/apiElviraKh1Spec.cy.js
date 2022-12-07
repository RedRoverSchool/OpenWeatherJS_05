/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let BOOKING_ID

let firsNname = "Kia"
let lastName = "Motors"
let totalPrice = 200
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
                "firstname": firsNname,
                "lastname": lastName,
                "totalprice": totalPrice,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": checkIn,
                    "checkout": checkOut
                },
                "additionalneeds": additionalNeeds
            }
        })

    it('API | Print response status: create booking confirmation', () => {
        getResponse()
            .then(response => {
                console.log(response)
                expect(response.status).to.equal(200)
            })
    })

    it('API Verify response:  created booking has fileds bookingid and object booking ', () => {
        getResponse()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                BOOKING_ID = response.bookingid
                cy.log('BOOKING_ID = ' + BOOKING_ID)

                expect(response).to.have.any.keys('booking')
                cy.log('Name: ' + response.booking.firstname + " " + response.booking.lastname)
                cy.log('Dates: ' + response.booking.bookingdates.checkin + "-" + response.booking.bookingdates.checkin)
                cy.log('Options: ' + response.booking.additionalneeds)
            })
    })
})
