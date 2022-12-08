/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

describe('API with Cypress', () => {

      describe('GET all bookingIds', () => {
            
            const getResponse = () => 
                  cy.request({
                        method:"Get",
                  url: `${API_BASE_URL}/booking`
            })
            
            it('Verify response has headers', () => {
                  getResponse()
                  .then(response => {
                        console.log(response)
                        expect(response).to.have.property('headers')
                  })
            });

            it('Verify response status', () => {
                  getResponse()
                  .its('status')
                  .should('be.eq', 200)
                  // .then(response => {
                  //       expect(response.status).to.equal(200)
                  // })
            });

            it('Verify response body is array', () => {
                  getResponse()
                  .its('body')
                  .should('be.an', 'array')
            });

            it('Verify response contains object with key bookingId', () => {
                  getResponse()
                  .its('body')
                  .then(response => {
                        expect(response[0]).to.have.keys('bookingid')
                  })
            });
      });
});
