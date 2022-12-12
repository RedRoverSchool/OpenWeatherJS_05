/// <reference types="cypress"/>


const API_BASE_URL = Cypress.env('apiBaseUrl')
let CREATED_ID
let TOKEN
describe('IrinadashkSpec', () => {

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
            })

            it('Verify response status', () => {
                  getResponse()
                  .its('status')
                  .should('be.eq', 200)
            })

            it('Verify response body is array', () => {
                  getResponse()
                  .its('body')
                  .should('be.an', 'array')
            })

            it('Verify response contains object with key bookingId', () => {
                  getResponse()
                  .its('body')
                  .then(response => {
                        expect(response[0]).to.have.keys('bookingid')
                  })
            })
      })

      describe('Greate Booking', () => {
            
            const getResponse = () => 
                  cy.request({
                        method:"Post",
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
                  })
            
            it('Verify response has status 200', () => {
                  getResponse()
                  .its('status')
                  .should('be.eq', 200)
            })

            it('Verify response has status 200', () => {
                  getResponse()
                  .then(({ status }) => {
                  expect(status).to.equal(200)
                  })
            })

            it('Print response', () => {
                  getResponse()
                  .then(response => {
                  console.log(response.body)
                  expect(response.status).to.equal(200)
                  })
            })  
            
            it('Print response has key bookingid', () => {
                  getResponse()
                  .its('body')
                  .then(response => {
                  expect(response).to.have.any.keys('bookingid') 
                  CREATED_ID = response.bookingid
                  console.log('CREATED_ID = ', CREATED_ID)
                  })
            }) 
            
            it('verify response contains object with key bookingid', () => {
                  getResponse()
                  .then(({ body }) => {
                  expect(body).to.have.any.keys('bookingid') 
                  })
            })
      })
      
      describe('AUTH', () => {
            
            const getResponse = () => 
                  cy.request({
                        method:"Post",
                        url: `${API_BASE_URL}/auth`,
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: {
                              "username" : "admin",
                              "password" : "password123"
                        }
                  })
            
            it('Verify response has status 200', () => {
                  getResponse()
                  .its('status')
                  .should('be.eq', 200)
            })

            it('Print response', () => {
                  getResponse()
                  .then(response => {
                  console.log(response.body)
                  expect(response.status).to.equal(200)
                  })
            })  
            
            it('Print response has key token', () => {
                  getResponse()
                  .its('body')
                  .then(response => {
                  expect(response).to.have.any.keys('token') 
                  TOKEN = response.token
                  console.log('TOKEN = ', TOKEN)
                  })
            }) 
      }) 
})
