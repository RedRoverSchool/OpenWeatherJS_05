/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const API_DATA = require('../../fixtures/apiData.json');
const DATE_FORMAT = /\d{4}-\d{2}-\d{2}/;
let CREATION_ID;

describe("artDiuzhikovSpec", function () {

    const createABooking = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            body: {
                "firstname": "Ivanka",
                "lastname": "Roust",
                "totalprice": 214,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2022-06-06",
                    "checkout": "2019-06-12"
                },
                "additionalneeds": "Duck feather pillows"
            }
        });

    const getTheBooking = () =>
        cy.request(`${API_BASE_URL}/booking/${CREATION_ID}`);

    describe("Create a booking test suite", function () {

        it('Verify the status of the booking creation', function () {
            createABooking()
                .then(createdBooking => {
                    expect(createdBooking).to.have.property('status', API_DATA.statusOk);
                    CREATION_ID = createdBooking.body.bookingid;
                });
        });

        it('Verify the last name in the latest created booking', function () {
            getTheBooking()
                .then(createdBooking => {
                    expect(createdBooking.body.lastname).to.be.equal('Roust');
                });
        });

        it('Verify the price in the latest created booking', function () {
            getTheBooking()
                .then(createdBooking => {
                    expect(createdBooking.body.totalprice).to.be.equal(214);
                });
        });
    });

    describe("Get the booking test suite", function () {

        it('Verify the booking ID', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.allRequestResponses['0']['Request URL']).to.include(CREATION_ID);
                });
        });

        it('Verify the format of "check in date" key', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.body.bookingdates.checkin).to.match(DATE_FORMAT);
                });
        });

        it('Verify the format of "check out date" key', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.body.bookingdates.checkout).to.match(DATE_FORMAT);
                });
        });

        it('Verify the type of "deposit paid" key', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.body.depositpaid).to.be.a(API_DATA.typeBoolean);
                });
        });
    });
});