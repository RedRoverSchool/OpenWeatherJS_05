/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
const apiData = require('../../fixtures/apiData.json')
let CREATED_ID;

describe('API | elviraAvshalumovSpec ', () => {

    describe('Get all bookingIds', () =>{

        const getResponse = () => 
            cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking`
            })
        
    
        it('Verify response have headers', () => {
            getResponse()
            .then(response => {
                console.log(response);
                expect(response).to.have.property('headers')
            })
        })

        it('Verify response status', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        })

        it('Verify response is an Array', () => {
            getResponse()
            .its('body')
            .should('be.an', 'array')
        })

        it('Verify response have an object with the key bookingId', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.key('bookingid')
            })
        })
        
    })

    describe('Create a booking', () =>{

        const createBooking = () => 
            cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "firstname" : apiData.firstname,
                "lastname" : apiData.lastname,
                "totalprice" : apiData.totalprice,
                "depositpaid" : apiData.depositpaid,
                "bookingdates" : {
                    "checkin" : apiData.bookingdates.checkin,
                    "checkout" : apiData.bookingdates.checkout
                },
                "additionalneeds" : apiData.additionalneeds
            }
            })

        it('Verify response body is an Object', () => {
            createBooking()
            .its('body')
            .should('be.an', 'object')
        })
        
    
        it('Verify response status', () => {
            createBooking()
            .then(response => {
                expect(response.status).to.equal(200);
            })
        })

        it('Verify response ha key bookingid', () => {
            createBooking()
            .its('body')
            .then(response => {
                expect(response).to.have.any.keys('bookingid')
                CREATED_ID = response.bookingid;
                console.log('CREATED_ID ==>', CREATED_ID);
            })
        })
  
    })
})