/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const API_DATA = require('../../fixtures/apiData.json');
let CREATED_ID;

describe('artemDerevninSpec', () => {


    describe('Test suite of booking', () => {
        
        const createBooking = () =>    
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : "Jim",
                    "lastname" : "Brown",
                    "totalprice" : 111,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
                }
            }); 

        it('Verify response has key bookingid', () => {
            createBooking()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                CREATED_ID = response.bookingid
            });
        });    
    });

    describe('Verify responses of the booking', () => {
        
        const getBooking = () => 
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking/${CREATED_ID}`
        }); 

        it('Verify the last name of the booking', () => {
            getBooking()
            .then(response => {
                expect(response.body.lastname).to.be.equal('Brown')
            });
        });

        it('Verify the total price of the booking', () => {
            getBooking()
            .then(response => {
                expect(response.body.totalprice).to.be.equal(111)
            });
        });

        it('Verify response status', () => {
            getBooking()
            .its('status')
            .should('be.eq', API_DATA.statusOk);
        });
    });
});
