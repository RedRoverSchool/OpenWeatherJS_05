/// <reference types="cypress"/>


const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let apiData
let CREATED_ID
let TOKEN

describe('IrinadashkSpec', () => {

      beforeEach(function () {
            cy.fixture('apiData').then(data => {
                  apiData = data
                  return apiData
            })
      })

      describe('GET all booking Ids', () => {
            
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

      describe('Create Booking', () => {
            
            const createBookingRequest = () => 
                  cy.request({
                        method:"Post",
                        url: `${API_BASE_URL}/booking`,
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: API_DATA.bodyCreateBooking
                  })
            
            it('Verify response has status 200', () => {
                  createBookingRequest()
                  .its('status')
                  .should('be.eq', 200)
            })

            it('Verify response has status 200', () => {
                  createBookingRequest()
                  .then(({ status }) => {
                  expect(status).to.equal(200)
                  })
            })

            it('Verify response is object', () => {
                  createBookingRequest()
                  .then(({ body }) => {
                        expect(body).to.be.an('object')
                  })
            })

            it('Print response', () => {
                  createBookingRequest()
                  .then(response => {
                  console.log(response.body)
                  expect(response.status).to.equal(200)
                  })
            })  
            
            it('Print response has key bookingid', () => {
                  createBookingRequest()
                  .its('body')
                  .then(response => {
                  expect(response).to.have.any.keys('bookingid') 
                  CREATED_ID = response.bookingid
                  console.log('CREATED_ID = ', CREATED_ID)
                  })
            }) 
            
            it('verify response contains object with key bookingid', () => {
                  createBookingRequest()
                  .then(({ body }) => {
                  expect(body).to.have.any.keys('bookingid') 
                  })
            })

            it('verify that request creates booking', () => {
                  createBookingRequest()
                  .then(response => {
                        expect(response.body.booking.lastname).to.equal(API_DATA.bodyCreateBooking.lastname)
                  })
            }) 
      })

      describe('Verify body of created booking has requested values', () => {
            it('verify that created booking has requested first name ', () => {
                  cy.request(`${API_BASE_URL}/booking/${CREATED_ID}`)
                  .then(({ body }) => {
                        expect(body.firstname).to.equal(API_DATA.bodyCreateBooking.firstname)
                  })

            });
      })

      describe('Get booking Ids', () => {

            const getBookingIds = () =>
                  cy.request(`${API_BASE_URL}/booking`)

            it('verify response status', () => {
                  getBookingIds()
                  .then(({ status }) => {
                        expect(status).to.equal(200)
                  })
            });

            it('verify response is array', () => {
                  getBookingIds()
                  .its('body')
                  .should('be.an', 'array')
            });

            it('verify response is array', () => {
                  getBookingIds()
                  .then(({ body }) => 
                  expect(body).to.be.an('array'))
            });
      });

      describe('Get booking by filter lastnames', () => {
            
            const filterBylastName = () =>
                  cy.request(`${API_BASE_URL}/booking?lastname=${API_DATA.lastname}`)

            it('Verify status', () => {
                  filterBylastName()
                  .then(response => {
                  expect(response.status).to.equal(200)
                  console.log(response.body)
                  })
            });
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
      });

      describe('Delete booking by ID', () => {
            const deleteBooking = () => 
             cy.request({
                  method: "DELETE",
                  url: `https://restful-booker.herokuapp.com/booking/${CREATED_ID}`,
                  headers:{
                        "Content-Type": "application/json",
                        "Cookie": `token=${TOKEN}`
                  }
            })
            
            
            it('Delete created booking', () => {
                 deleteBooking()
                 .then(({ status }) => {
                        expect(status).to.equal(201)
                  })
            });

            it('Delete not existing booking Negative', () => {
                  cy.request({
                        method: "DELETE",
                        url: `https://restful-booker.herokuapp.com/booking/${CREATED_ID}`,
                        headers:{
                              "Content-Type": "application/json",
                              "Cookie": `token=${TOKEN}`
                        },
                        failOnStatusCode: false
                  }).then(({ status }) => {
                        expect(status).to.equal(405)
                  })
            });

            it('Get non existing booking by ID Negative', () => {
                  cy.request({
                        url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                        failOnStatusCode: false
                  }).then(({status}) =>{
                        expect(status).to.equal(404)
                  })
            })

            it('The error message "Not Found" appears when we Get not existing booking by ID', () => {
                  cy.request({
                        url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                        failOnStatusCode: false
                  }).then(response =>{
                        cy.log(response)
                        expect(response.body).to.contains('Not Found')
                  })
            })
      })
})
