/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const API_FIXTURES = require('../../fixtures/apiData.json');
const DATE_FORMAT = /\d{4}-\d{2}-\d{2}/;
let CREATION_ID;
let TOKEN;

describe('artDiuzhikovSpec', function () {

    const createAToken = () =>
        cy.request({
            method: 'POST',
            url: `${API_BASE_URL}/auth`,
            body: API_FIXTURES.admin
        });

    const createABooking = () =>
        cy.request({
            method: 'POST',
            url: `${API_BASE_URL}/booking`,
            body: API_FIXTURES.artData.forCreate
        });

    const getTheBooking = () =>
        cy.request({
            method: 'GET',
            url: `${API_BASE_URL}/booking/${CREATION_ID}`,
            failOnStatusCode: false
        });

    const updateTheBooking = () =>
        cy.request({
            method: 'PUT',
            url: `${API_BASE_URL}/booking/${CREATION_ID}`,
            headers: {
                'Cookie': `token=${TOKEN}`
            },
            body: API_FIXTURES.artData.forUpdate
        });

    const partialUpdateTheBooking = () =>
        cy.request({
            method: 'PATCH',
            url: `${API_BASE_URL}/booking/${CREATION_ID}`,
            headers: {
                'Cookie': `token=${TOKEN}`
            },
            body: API_FIXTURES.artData.forPartialUpdate
        });

    const deleteTheBooking = () =>
        cy.request({
            method: 'DELETE',
            url: `${API_BASE_URL}/booking/${CREATION_ID}`,
            headers: {
                'Cookie': `token=${TOKEN}`
            }
        });

    describe('Create a token test suite', function () {

        it('Verify the response body has "token" key and send it to the global variable "TOKEN"', function () {
            createAToken()
                .then(createdToken => {
                    expect(createdToken.body).to.have.key(API_FIXTURES.artData.token);
                    TOKEN = createdToken.body.token;
                });
        });
    });

    describe('Create a booking test suite', function () {

        it('Verify the status of the booking creation and send the boking ID to the global variable "CREATION_ID"', function () {
            createABooking()
                .then(createdBooking => {
                    expect(createdBooking).to.have.property('status', API_FIXTURES.statusOk);
                    CREATION_ID = createdBooking.body.bookingid;
                });
        });

        it('Verify the "last name" in the created booking', function () {
            getTheBooking()
                .then(createdBooking => {
                    expect(createdBooking.body.lastname).to.be.equal(API_FIXTURES.artData.forCreate.lastname);
                });
        });

        it('Verify the "additional needs" in the created booking', function () {
            getTheBooking()
                .then(createdBooking => {
                    expect(createdBooking.body.additionalneeds).to.be.equal(API_FIXTURES.artData.forCreate.additionalneeds);
                });
        });

        it('Verify the "price" in the created booking', function () {
            getTheBooking()
                .then(createdBooking => {
                    expect(createdBooking.body.totalprice).to.be.equal(214);
                });
        });
    });

    describe('Get the booking test suite', function () {

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
                    expect(booking.body.depositpaid).to.be.a(API_FIXTURES.typeBoolean);
                });
        });
    });

    describe('Update the booking test suite', function () {

        it('Update the "last name" in the created booking and verify it', function () {
            updateTheBooking()
                .then(booking => {
                    expect(booking.body.lastname).to.be.equal(API_FIXTURES.artData.forUpdate.lastname);
                });
        });

        it('Verify the "additional needs" in the updated booking', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.body.additionalneeds).to.be.equal(API_FIXTURES.artData.forUpdate.additionalneeds);
                });
        });
    });

    describe('Partial update the booking test suite', function () {

        it('Partial update the created booking and verify the "first name"', function () {
            partialUpdateTheBooking()
                .then(booking => {
                    expect(booking.body.firstname).to.be.equal(API_FIXTURES.artData.forPartialUpdate.firstname);
                });
        });

        it('Verify the "last name" in the partially updated booking', function () {
            getTheBooking()
                .then(booking => {
                    expect(booking.body.lastname).to.be.equal(API_FIXTURES.artData.forPartialUpdate.lastname);
                });
        });
    });

    describe('Delete the booking test suite', function () {

        it('Delete the booking and verify the status', function () {
            deleteTheBooking()
                .then(deletedBooking => {
                    expect(deletedBooking.body).to.be.equal(API_FIXTURES.artData.forDelete.statusCreated);
                });
        });

        it('Verify the deleted booking doesn\'t exist', function () {
            getTheBooking()
                .then(deletedBooking => {
                    expect(deletedBooking.body).to.be.equal(API_FIXTURES.artData.forDelete.statusNotFound);
                });
        });

        it('Verify the status code when retrieving the deleted booking', function () {
            getTheBooking()
                .then(deletedBooking => {
                    expect(deletedBooking).to.have.property('status', API_FIXTURES.artData.forDelete.code404);
                });
        });
    });
});