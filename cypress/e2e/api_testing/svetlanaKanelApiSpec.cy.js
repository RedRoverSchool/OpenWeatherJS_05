/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
let CREATED_ID;
let CREATED_TOKEN;

describe("svetlanaKanelApiSpec", () => {

    const createBooking = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
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
        cy.request(`${API_BASE_URL}/booking/${CREATED_ID}`);

    const getAllBookings = () =>
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking`
        });

    const createToken = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth`,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                "username": "admin",
                "password": "password123"
            }
        });

    const updateBooking = () => 
        cy.request({
            method: "PUT",
            url: `${API_BASE_URL}/booking/${CREATED_ID}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${CREATED_TOKEN}`
            },
            body: {
                "firstname": "Jumanji",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast + aperol spritz"
            }
        })

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

    describe('Create a new auth token to use for access to the PUT and DELETE/booking', () => {

        it('verify that token is created and assigh it to the global varible CREATED_TOKEN', () => {
            createToken()
                .its('body')
                .then(response => {
                    expect(response).to.have.keys('token');
                    CREATED_TOKEN = response.token;
                    console.log("CREATED_TOKEN = ", CREATED_TOKEN);
                });
        });
    });

    describe('Booking - UpdateBooking', () => {
        
        it('Update booking and verifay status', () => {
            updateBooking()
            .its('status')
            .should('be.equal', 200)
        });

        it('veryfy new updations', () => {
            updateBooking()
            .its('body')
            .then(response => {
                expect(response.firstname).to.eq("Jumanji");
            })            
        })
    });

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