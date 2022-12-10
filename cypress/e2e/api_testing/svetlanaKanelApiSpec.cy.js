/// <reference types="cypress"/>

const API_Base_URL = Cypress.env('apiBaseUrl');
let CREATED_ID;

describe("svetlanaKanelApiSpec", () => {

    const createBooking = () =>
        cy.request({
            method: "POST",
            url: `${API_Base_URL}/booking`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });

    const getCreatedBooking = () =>
        cy.request(`${API_Base_URL}/booking/${CREATED_ID}`);

    const getAllBookings = () =>
        cy.request({
            method: "GET",
            url: `${API_Base_URL}/booking`
        });

    describe("Create a booking test suite", () => {

        it('check response', () => {
            createBooking()
                .then(response => {                    
                    expect(response.status).to.equal(200);
                })
        })

        it('verify that response has key "bookingid" and assign the bookingid to the global veraible CREATED_ID', () => {
            createBooking()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.key('bookingid');
                    CREATED_ID = response.bookingid;
                    console.log('CREATED_ID = ', CREATED_ID);
                })
        })
    })

    describe("Get created booking ID", () => {

        it('verify response has headers', () => {
            getCreatedBooking()
                .then(response => {
                    console.log(response);
                    expect(response).to.have.property('headers');
                })
        })

        it('verify response has status', () => {
            getCreatedBooking()
                .its('status')
                .should('be.eq', 200)
        })

        it('verify response is an object', () => {
            getCreatedBooking()
                .its('body')
                .should('be.an', 'object');
        })

        it('verify response contains an object with key additionalneeds', () => {
            getCreatedBooking()
                .its('body')
                .then(response => {                    
                    expect(response).to.include.keys('additionalneeds');
                })
        })
    })

    describe("Get all BookingsIds", () => {

        it('verify response has headers', () => {
            getAllBookings()
                .then(response => {
                    console.log(response)
                    expect(response).to.have.property('headers')
                })
        })

        it('verify response has status', () => {
            getAllBookings()
                .its('status')
                .should('be.eq', 200)
        })

        it('verify response is array', () => {
            getAllBookings()
                .its('body')
                .should('be.an', 'array')
        })

        it('verify response contains object with key bookingid', () => {
            getAllBookings()
                .its('body')
                .then(response => {
                    expect(response[0]).to.have.keys('bookingid')
                })
        })
    })
})