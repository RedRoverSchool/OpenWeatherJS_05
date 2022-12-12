/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let authToken

describe("firstApiTestSpec", () => {

    describe("Get authorised Token", () => {

        const getAuthResponse = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/auth/`,

                body: {
                    "username": 'admin',
                    "password": 'password123'
                }
            });

        it('Verify response status', () => {
            getAuthResponse()
                .then(response => {
                    console.log(response)
                    expect(response.status).to.equal(200)
                    cy.log(response.status)
                })
        });

        it('Verify response has Token ', () => {

            getAuthResponse()
                .then(authToken => {
                    console.log(authToken)
                    expect(authToken.body).to.have.key('token')
                    authToken = authToken.body.token
                    cy.log(authToken)
                })
        });

        it('Verify response type is string', () => {
            getAuthResponse()
                .then(authToken => {
                    expect(authToken.body.token).to.have.string(authToken.body.token)
                    cy.log(typeof authToken)
                })
        });

        it("Verify token has length ", () => {
            getAuthResponse()
                .then(authToken => {
                    expect(authToken.body.token).to.have.ownProperty('length')
                    cy.log(authToken.body.token.length)
                })
        });

        it('Verify content-type', () => {

            getAuthResponse()
                .then(response => {
                    expect(response.headers['content-type']).to.contain('application/json')
                    cy.log(response.headers['content-type'])
                })
        });
    });
})

