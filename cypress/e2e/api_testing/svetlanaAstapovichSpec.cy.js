/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let CREATED_TOKEN
let CREATED_BOOKINGID

describe("svetlanaAstapovichSpec", () => {

    describe("Get BookingIds Tests suite", () => {

        const getBookingIds = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            });

        it("Verify status GET response", () => {
            getBookingIds()
            .then(({status}) => {
                expect(status).to.equal(200)
            })
        });

        it("Verify response is array", () => {
            getBookingIds()
            .then(({body}) => {
                expect(body).to.be.an('array')
            })
        });
    });

    describe("Get booking by filter lastname", () => {
        
        const filterByLastName = () => 
            cy.request({
                    method: "GET",
                    url: `${API_BASE_URL}/booking?lastname=${API_DATA.lastname}`
            });

        it("Verify status filter response", () => {
            filterByLastName()
            .then(response => {
                expect(response.status).to.equal(200)
            })
        });
    });

    describe("Create token", () => {
        
        const createToken = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/auth`,
                headers: API_DATA.headersContentType,
                body: API_DATA.admin
            });

        it("Verify created token", () => {
            createToken()
            .then(response => {
                expect(response.body).to.have.keys('token')
                CREATED_TOKEN = response.body.token
            })
        });
    });

    describe("Create Booking", () => {

        const createBooking = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: API_DATA.headersContentType,
                body: API_DATA.bodyCreateBooking
            });

        it("Verify ID created", () => {
            createBooking()
            .then(({body}) => {
                expect(body).to.have.property('bookingid')
                CREATED_BOOKINGID = body.bookingid
            })
        });

        it("Verify status POST request" , () => {
            createBooking()
            .then(response => {
                expect(response.status).to.equal(200)
            })
        });

        it("Verify response is object", () => {
            createBooking()
            .then(({body}) => {
                expect(body).to.be.a('object')
            })
        });

        it("Verify body of created booking has all requested values", () => {
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`
            }).then(({body}) => {
                    expect(body.firstname).to.equal(API_DATA.bodyCreateBooking.firstname)
            })
        });

        it("Delete created booking", () => {
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${CREATED_TOKEN}`
                }
            }).then(response => {
                expect(response.status).to.equal(201)
            })

            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(404)
            })
        });
    });
});