/// <reference types="cypress"/>

const API_Base_URL = Cypress.env('apiBaseUrl');
let CREATED_ID;

describe("svetlanaKanelApiSpec", () => {

    describe("Create booking", () => {

        const getResponse = () =>
            cy.request({
                method: "POST",
                url: `${API_Base_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname": "Jim",
                    "lastname": "Brown",
                    "totalprice": 111,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2018-01-01",
                        "checkout": "2019-01-01"
                    },
                    "additionalneeds": "Breakfast"
                }
            })

        it('check response', () => {
            getResponse()
                .then(response => {
                    console.log("Sveta =", response.body);
                    expect(response.status).to.equal(200);
                })
        })

        it('verify response has key', () => {
            getResponse()
                .its('body')
                .then(response => {
                    expect(response).to.have.any.key('bookingid');
                    CREATED_ID = response.bookingid;
                    console.log('CREATED_ID = ', CREATED_ID);
                })
        })
    })

    describe("Get created booking ID", () => {

        const getResponse = () =>
            cy.request(`${API_Base_URL}/booking/${CREATED_ID}`);

        it('verify response has headers', () => {
            getResponse()
                .then(response => {
                    console.log(response);
                    expect(response).to.have.property('headers');
                })
        })

        it('verify response has status', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })

        it('verify response is an object', () => {
            getResponse()
                .its('body')
                .should('be.an', 'object');
        })

        it('verify response contains an object with key additionalneeds', () => {
            getResponse()
                .its('body')
                .then(response => {
                    console.log('Sveta2', response);
                    expect(response).to.include.keys('additionalneeds');
                })
        })
    })    

    describe("Get all BookingsIds", () => {

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_Base_URL}/booking`
            })

        it('verify response has headers', () => {
            getResponse()
                .then(response => {
                    console.log(response)
                    expect(response).to.have.property('headers')
                })
        })

        it('verify response has status', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })

        it('verify response is array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        })

        it('verify response contains object with key bookingid', () => {
            getResponse()
                .its('body')
                .then(response => {
                    expect(response[0]).to.have.keys('bookingid')
                })
        })
    })
})