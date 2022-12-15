// / <reference types = "cypress"/>

const apiData = require('../../fixtures/apiData.json');
const API_BASE_URL = Cypress.env('apiBaseUrl');

let CREATED_ID;
let TOKEN;

describe('API tests for the playground API restful-booker', () => {

    const createdToken = () => 
    cy.request({
        method: "POST", 
        url: `${API_BASE_URL}/auth`, 
        headers: apiData.headersContentType, 
        body: apiData.admin
    });

    const getBookingAllIds = () => 
    cy.request({
        method: "GET", 
        url: `${API_BASE_URL}/booking`
    });

    const getBookingId = () => 
    cy.request({
        method: "GET", 
        url: `${API_BASE_URL}/booking/1`, 
        headers: apiData.headersContentType
    });

    const getNewBookingId = () => 
    cy.request({
        method: "POST", 
        url: `${API_BASE_URL}/booking`, 
        headers: apiData.headersContentType, 
        body: apiData.romData.create
    })

    const getUpdateNewBookingId = () =>
    cy.request({
        method: "PUT", 
        url: `${API_BASE_URL}/booking/${CREATED_ID}`, 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${TOKEN}`
        },
        body: apiData.romData.update
    })

    const getPartialUpdateBooking = () =>
    cy.request({
        method: "PATCH", 
        url: `${API_BASE_URL}/booking/${CREATED_ID}`, 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${TOKEN}`
        },
        body: apiData.romData.partialUpdate
    })

    const getDeleteBooking = () =>
    cy.request({
        method: "DELETE", 
        url: `${API_BASE_URL}/booking/${CREATED_ID}`, 
        headers: {
            "Content-Type": "application/json",
            "Authorization": apiData.romData.authorizationHeader,
            "Cookie": `token=${TOKEN}`
        },
        body: apiData.romData.partialUpdate
    })

    describe('1_Verify created token', () => {

        it('Create token', () => {
            createdToken().then(({body}) => {
                expect(body).to.have.key('token');
                TOKEN = body.token;
                console.log(TOKEN);
            });
        });

        it('Verify status code is 200', () => {
            createdToken().then(({status}) => {
                expect(status).to.equal(200);
                console.log(status);
            });
        });
    });

    describe('2_Verify the ids of all the bookings ', () => {

        it('Verify status code is 200', () => {
            getBookingAllIds().then(({status}) => {
                expect(status).to.equal(200);
                console.log(status);
            });
        });

        it('Verify key', () => {
            getBookingAllIds()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.keys('bookingid')
            });
        });

        it('Verify response body is an array', () => {
            getBookingAllIds().then(({body}) => {
                expect(body).to.be.an('array');
            });
        });
    });

    describe('3_Verify a specific booking', () => {

        it('Verify status code is 200', () => {
            getBookingId().then(({status}) => {
                expect(status).to.equal(200);
                console.log(status);
            });
        });

        it('Verify that total price value is number', () => {
            getBookingId().then(({body}) => {
                expect(body.totalprice).to.be.a('number');
            });
        });

        it('Verify that checkin value is string', () => {
            getBookingId()
            .then(({body}) => {
                expect(body.bookingdates.checkin).to.be.a('string');
            });
        });
    });

    describe('4_Verify creates a new booking in the API', () => {
        
        it('Verify status code is 200', () => {
            getNewBookingId()
            .then(({status, body}) => {
                expect(status).to.equal(200);
                CREATED_ID = body.bookingid;
                console.log(CREATED_ID);
            });
        });
    });

    describe('5_Verify updates a current booking', () => {

        it('Verify response status update booking', () => {
            getUpdateNewBookingId()
            .then(({status}) => {
                expect(status).to.eq(200);
            });
        });

        it('Verify that depositpaid value is boolean', () => {
            getUpdateNewBookingId()
            .then(({body}) => {
                expect(body.depositpaid).to.be.a('boolean');
            });
        });
    });

    describe('6_Verify updates a current booking with a partial payload ', () => {

        it('Verify response status partial update booking', () => {
            getPartialUpdateBooking()
            .then(({status}) => {
                expect(status).to.eq(200);
            });
        });

        it('Verify that firstname value is string', () => {
            getPartialUpdateBooking()
            .then(({body}) => {
                expect(body.firstname).to.be.a('string');
            });
        });
    });

    describe('7_Verify deletes a current booking ', () => {

        it('Verify response message on delete booking', () => {
            getDeleteBooking()
            .then(({body,status}) => {
                expect(body).to.eq("Created");
            });
        });
    });
});
