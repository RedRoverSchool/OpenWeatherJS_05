/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const apiData = require('../../fixtures/apiData.json');
const dateFormat = /\d{4}-\d{2}-\d{2}/;

describe("API testing with Cypress", function () {

    beforeEach(function () {
        cy.fixture('apiData').then(apiData => {
            this.apiData = apiData;
        });
    });

    describe("Get a booking test suite", function () {

        const getTheBooking = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${apiData.bookingID}`
            });
    
        it('Verify the status of the response', function () {
            getTheBooking()
            .then(response => {
                console.log(response);
                expect(response).to.have.property('status', this.apiData.statusOk);
            });
        });

        it('Verify the booking ID', function () {
            getTheBooking()
            .then(response => {
                expect(response.allRequestResponses['0']['Request URL']).to.include(this.apiData.bookingID);
            });
        });

        it('Verify the format of "check in date" key', function () {
            getTheBooking()
            .then(response => {
                expect(response.body.bookingdates.checkin).to.match(dateFormat);
            });
        });

        it('Verify the format of "check out date" key', function () {
            getTheBooking()
            .then(response => {
                expect(response.body.bookingdates.checkout).to.match(dateFormat);
            });
        });

        it('Verify the type of "deposit paid" key', function () {
            getTheBooking()
            .then(response => {
                expect(response.body.depositpaid).to.be.a(this.apiData.typeBoolean);
            });
        });
    });
});