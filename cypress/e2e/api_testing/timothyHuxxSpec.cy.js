/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')
let TOKEN

describe("API test suit", () => {

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
})