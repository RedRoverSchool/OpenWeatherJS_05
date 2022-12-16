/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
let CREATE_ID;

describe('alzhanSpec', () => {

    describe('Conduct Booking Tests Suite', () => {
        const getResponse = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            }); 
        
        it('verify response status is 200', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200) 
        });
    });

    describe('Create New Booking', () => {

        const getResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : "Elon",
                    "lastname" : "Musk",
                    "totalprice" : 1150,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2023-01-01",
                        "checkout" : "2023-01-05"
                    },
                    "additionalneeds" : "Breakfast"
                }
            });
        
        it('verify response status', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        });

        it('verify response has new booking', () => {
            getResponse()
            .then(response => {
                expect(response.status).to.equal(200)
                CREATE_ID = response.body.bookingid
            });
        });
    });
});
