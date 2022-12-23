/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let TOKEN;
let CREATION_ID;

describe("IlliaShabaievSpec", () => {

    describe("Create Booking", () => {
        const createToken = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/auth`,
                body: API_DATA.admin
            });

        const createBooking = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: API_DATA.illiaData.createBooking
            });

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`,
            });

        it("verify that request creates booking", () => {
            createBooking()
                .then(response => {
                    expect(response.body.booking.lastname).to.equal('Potter')
                });
        });

        it("verify that request returns 200 code", () => {
            createBooking()
                .then(response => {
                    expect(response.status).to.eq(200)
                });
        });

        it('verify the status of the booking creation and send the boking ID to the global variable "CREATION_ID"', function () {
            createBooking()
                .then(createdBooking => {
                    expect(createdBooking).to.have.property('status', 200);
                    CREATION_ID = createdBooking.body.bookingid;
                });
        });


        it("verify that created  return code is 200 when trying returning created data", () => {
            getResponse()
                .then(response => {
                    expect(response.status).to.eq(200)
                });
        });

        it("verify that value in additionalneeds field is not a number", () => {
            createBooking()
                .then(response => {
                    expect(response.body.additionalneeds).not.to.be.a("number");
                });
        });

        describe('Create token test suite', function () {
            it('Verify the response body has "token" key and send it to the global variable "TOKEN"', function () {
                createToken()
                    .then(createdToken => {
                        expect(createdToken.body).to.have.key(API_DATA.illiaData.token);
                        TOKEN = createdToken.body.token;
                    });
            });

        describe("Update booking", () => {
            const updateBooking = () =>
                cy.request({
                    method: 'PUT',
                    url: `${API_BASE_URL}/booking/${CREATION_ID}`,
                    headers: {
                        'Cookie': `token=${TOKEN}`
                    },
                    body: API_DATA.illiaData.updateBooking
               });


            it("verify that first name has updated", () => {
                updateBooking()
                    .then(response => {
                        expect(response.body.firstname).to.equal('Carlos')
                    });
                });

            it("verify that updated value in 'additionalneeds' field is a number", () => {
                updateBooking()
                    .then(response => {
                        expect(response.body.additionalneeds).to.be.a("number");
                    });
                });

            it("verify that value in additional need field is between 95 and 105", () => {
                updateBooking()
                    .then(response => {
                        expect(response.body.additionalneeds).to.be.within(95, 105)
                    });
                });

            it("verify that PUT method returns 200", () => {
                getResponse()
                    .then(response => {
                        expect(response.status).to.eq(200)
                    });
                });
            });
        });
    });

        describe("Delete booking", () => {
            const deleteBooking = () =>
                cy.request({
                    method: 'DELETE',
                    url: `${API_BASE_URL}/booking/${CREATION_ID}`,
                    headers: {
                    'Cookie': `token=${TOKEN}`
                }
            });

            const getTheBooking = () =>
                cy.request({
                    method: 'GET',
                    url: `${API_BASE_URL}/booking/${CREATION_ID}`,
                    failOnStatusCode: false
            });

        it('delete the booking and verify that status code retuns 404 for the next GET request on this data', () => {
            deleteBooking()
            getTheBooking()
                .then(deleteBooking => {
                    expect(deleteBooking).to.have.property('status', 404)
            });
        });
    });
});

