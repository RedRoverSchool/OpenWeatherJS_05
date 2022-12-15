/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let TOKEN;

describe("TimothyHuxxSpec ", () => {

    describe('Auth - Create token', () => {

        const getAuthResponse = () =>
            cy.request({
                method: 'POST',
                url: `${API_BASE_URL}/auth`,
                body: {
                    "username": "admin",
                    "password": "password123"
                }
            });

        it("Verify response body has key token and send it to the global variable TOKEN", () => {
            getAuthResponse()
                .then(response => {
                    expect(response.body).to.have.key('token')
                    TOKEN = response.body.token
                })
        });

        it("Verify response has type object", () => {
            getAuthResponse()
                .then(response => {
                    expect(response).to.be.an('object', 'In case of an error, this message displayed');
                })
        });

        it("Verify response status code is 200", () => {
            getAuthResponse()
                .then(response => {
                    expect(response.status).to.be.eq(200);
                })
        });

        it("Verify token has type string", () => {
            getAuthResponse()
                .then(response => {
                    expect(response.body.token).to.have.be.a('string')
                })
        });

        it("Verify response header has key content-type", () => {
            getAuthResponse()
                .then(response => {
                    expect(response.headers).to.contain.key('content-type')
                })
        });

        it("Verify response header content-type contains value application/json", () => {
            getAuthResponse()
                .then(response => {
                    expect(response.headers['content-type']).to.contain('application/json')
                })
        });

        it("Verify the response header keys", () => {

            getAuthResponse()
                .then(response => {
                    expect(Object.keys(response.headers)).to.eql(apiData.arrOfHeadersKeys)
                })
        });
    });

    describe("Booking - GetBooking test suit", () => {

        before(() => {
            cy.request('https://restful-booker.herokuapp.com/booking')
                .then(({ body }) => {
                    return body[Math.floor(Math.random() * body.length)].bookingid
                }).as('bookingRequest')
        });

        it("Verify random Booking body has required keys", function () {
            cy.request(`${API_BASE_URL}/booking/${this.bookingRequest}`)
                .its('body')
                .then((response) => {
                    expect(response).to.have.keys(apiData.timothyData.booking.getBooking)
                })
        });

        it("Verify Booking body response type is object ", function () {
            cy.request(`${API_BASE_URL}/booking/${this.bookingRequest}`)
                .should(({ body }) => {
                    expect(body).to.be.an('object')
                })
        });

        it("Verify Booking body response key's data type ", function () {
            cy.request(`${API_BASE_URL}/booking/${this.bookingRequest}`)
                .should(({ body }) => {
                    for (let key in body) {
                        expect(typeof body[key]).to.eq(apiData.timothyData.booking.dataType[key])
                    }
                })
        });
    });
})