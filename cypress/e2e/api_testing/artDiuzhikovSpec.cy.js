/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const apiData = require('../../fixtures/apiData.json');
const dateFormat = /\d{4}-\d{2}-\d{2}/;
let creationID;

describe("API testing with Cypress", function () {

    describe("Get a booking test suite", function () {

        const getTheBooking = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${apiData.bookingID}`
            });
    
        it('Verify the status of the response', function () {
            getTheBooking().then(response => {
                expect(response).to.have.property('status', apiData.statusOk);
            });
        });

        it('Verify the booking ID', function () {
            getTheBooking().then(response => {
                expect(response.allRequestResponses['0']['Request URL']).to.include(apiData.bookingID);
            });
        });

        it('Verify the format of "check in date" key', function () {
            getTheBooking().then(response => {
                expect(response.body.bookingdates.checkin).to.match(dateFormat);
            });
        });

        it('Verify the format of "check out date" key', function () {
            getTheBooking().then(response => {
                expect(response.body.bookingdates.checkout).to.match(dateFormat);
            });
        });

        it('Verify the type of "deposit paid" key', function () {
            getTheBooking().then(response => {
                expect(response.body.depositpaid).to.be.a(apiData.typeBoolean);
            });
        });
    });

    describe("Create a booking test suite", function () {

        const createABooking = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : "Ivanka",
                    "lastname" : "Roust",
                    "totalprice" : 214,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2022-06-06",
                        "checkout" : "2019-06-12"
                    },
                    "additionalneeds" : "Duck feather pillows"
                }
            });

        it('Verify the status of the booking creation', function () {
            createABooking().then(response => {
                expect(response).to.have.property('status', apiData.statusOk);
                creationID = response.body.bookingid;
            });
        });

        it('Verify the last name in the latest created booking', function () {
            cy.get(creationID).then(creationID => {
                cy.request('GET', `${API_BASE_URL}/booking/${creationID[0]}`).then(response => {
                    expect(response.body.lastname).to.be.equal('Roust');
                });
            });
        });

        it('Verify the price in the latest created booking', function () {
            cy.get(creationID).then(creationID => {
                cy.request('GET', `${API_BASE_URL}/booking/${creationID[0]}`).then(response => {
                    expect(response.body.totalprice).to.be.equal(214);
                });
            });
        });
    });
});