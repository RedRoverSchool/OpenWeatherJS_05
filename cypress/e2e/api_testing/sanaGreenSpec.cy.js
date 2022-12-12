/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let authToken

describe("First Api test", () => {

    describe("Get autorzed Token", () => {

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
                })
        });

        it('Verify response has Token ', () => {

            getAuthResponse()
                .then(authToken => {
                    console.log(authToken)
                    expect(authToken.body).to.have.key('token')
                    authToken = authToken.body.token
                })
        });

        it('Verify response type is string', () => {
            getAuthResponse()
                .then(authToken => {
                    expect(authToken.body.token).to.have.be.a('string')
                })
        });

        it("Verify token is not empty", () => {
            getAuthResponse()
                .then(authToken => {
                    expect(authToken.body.token).to.have.value
                })
        });

        it('Verify content-type', () => {

            getAuthResponse()
                .then(response => {
                    expect(response.headers['content-type']).to.contain('application/json')

                })
        });

    });
})

