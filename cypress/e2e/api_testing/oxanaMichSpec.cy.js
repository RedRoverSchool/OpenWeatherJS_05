/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env("apiBaseUrl");
const API_DATA = require('../../fixtures/apiData.json');
let BOOKING_ID
let TOKEN

describe("oxanaMichSpec", () => {
    describe("Get booking Ids", () => {
        const getBookingIds = () => cy.request(`${API_BASE_URL}/booking`)

        it("verify response status", () => {
            getBookingIds().then(response => {
                expect(response.status).to.eq(200)
            })
        })

        it("Verify response is array", () => {
            getBookingIds()
            .then(({body}) => {
                expect(body).to.be.an('array')
            })
        });

        it("Verify booking ids are numbers", () => {
            getBookingIds()
            .then(({body}) => {
                for (let i = 0; i < 50; i++)
                    expect(body[i].bookingid).to.be.an('number')
            })
        });
    })

    describe("Create and delete booking", () => {
        const createToken = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/auth`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "username": "admin",
                    "password": "password123"
                }
            });

        it('Authenticate', () => {
            createToken()
            .then(response => {
                expect(response.status).to.eq(200)
                TOKEN = response.body.token
            })
        })

        const createBooking = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${TOKEN}`
                },
                body: API_DATA.createBookingInfo
            })

        it("Verify create", () => {
            createBooking().then(response => {
                expect(response.body).has.property('bookingid')
                BOOKING_ID = response.body.bookingid
            })
        })

        const getBooking = () =>
            cy.request(`${API_BASE_URL}/booking/${BOOKING_ID}`);

        it("Verify created booking", () => {
            getBooking().then(response => {
                expect(response.status).to.equal(200)
                expect(response.body).has.property('firstname', API_DATA.createBookingInfo.firstname)
                expect(response.body).has.property('lastname', API_DATA.createBookingInfo.lastname)
                expect(response.body).has.property('totalprice', API_DATA.createBookingInfo.totalprice)
                expect(response.body.bookingdates).to.deep.equal(API_DATA.createBookingInfo.bookingdates)
                expect(response.body).has.property('additionalneeds', API_DATA.createBookingInfo.additionalneeds)
                expect(response.body).has.property('depositpaid', API_DATA.createBookingInfo.depositpaid)
            })
        })

        const deleteBooking = () =>
            cy.request({
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                headers: {
                    "Cookie": `token=${TOKEN}`
                },
            });

        it("Verify booking delete", () => {
            deleteBooking().then(response => {
                expect(response.status).to.equal(200)
            })
        })
    })
})
