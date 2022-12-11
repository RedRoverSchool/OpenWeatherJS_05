/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const API_DATA = require('../../fixtures/apiData.json');
let CREATED_ID;

describe('liliiaFadeevaSpec', () => {
    
    describe('Create a booking test suite', () => {

        const createBooking = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : API_DATA.firstname,
                    "lastname" : API_DATA.lastname,
                    "totalprice" : API_DATA.totalprice,
                    "depositpaid" : API_DATA.depositpaid,
                    "bookingdates" : {
                        "checkin" : API_DATA.bookingdates.checkin,
                        "checkout" : API_DATA.bookingdates.checkout
                    },
                    "additionalneeds" : API_DATA.additionalneeds
                }
            });

        it('Verify the status is successful', () => {
            createBooking()
                .then(response => {
                    expect(response.status).to.equal(API_DATA.statusOk)
                });
        });
    
        it('Verify the response has key bookingid', () => {
            createBooking()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.keys('bookingid')
                    CREATED_ID = response.bookingId;
                });
        });

        it('Verify there is "price" in the booking', () => {
            createBooking()
                .then(response => {
                    expect(response.body.booking).has.property('totalprice', API_DATA.totalprice);
                });
        });

        it('Verify that firstname is a string', () => {
            createBooking()
                .then(response => {
                    expect(response.body.booking.firstname).to.be.a('string');
                });
        });
    }); 
});
