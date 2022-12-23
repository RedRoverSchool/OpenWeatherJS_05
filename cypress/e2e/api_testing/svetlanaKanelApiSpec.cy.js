/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
let CREATED_ID;
let CREATED_TOKEN;
let bookingData;

describe("svetlanaKanelApiSpec", function () {

    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            bookingData = data;            
        })
    });

    const createBooking = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            headers: bookingData.headersContentType,
            body: bookingData.artData.forCreate
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
            headers: bookingData.headersContentType,
            body: bookingData.admin
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
            body: bookingData.artData.forUpdate
        })

    const partialUpdateBooking = () =>
        cy.request({
            method: "PATCH",
            url: `${API_BASE_URL}/booking/${CREATED_ID}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${CREATED_TOKEN}`
            },
            body: bookingData.lapData.patchUpdate           
        })
     

    describe("Create a booking test suite", function () {

        it('check response', function () {
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
                    expect(response.additionalneeds).to.eq('Bamboo pillows')
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
                expect(response.additionalneeds).to.eq("Duck feather pillows");
            })            
        })
    });

    describe('Partial update booking', () => {

        it('verify partial updation', function () {
            partialUpdateBooking()
            .its('body')
            .then(response => {
                console.log(response);
                expect(response.additionalneeds).to.eq("get Offer")
            })
        })
    })

    describe("Get all BookingsIds", () => {

        it('verify response has headers', () => {
            getAllBookings()
                .then(response => {
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