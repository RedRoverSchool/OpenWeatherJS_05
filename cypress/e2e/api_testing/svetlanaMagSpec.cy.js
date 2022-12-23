/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let CREATED_BOOKINGID
let TOKEN

describe('svetlanaMagSpec', () => {

    const getBookingIds = () => 
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking`
        })

    const createBooking = () =>
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/booking`,
            headers: API_DATA.headersContentType,
            body: API_DATA.bodyCreateBooking
        })
    
    const getCreatedBooking = () =>
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`
        })
    
    const createToken = () => 
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth`,
            headers: API_DATA.headersContentType,
            body: API_DATA.admin
        })    

    const updateBooking = () =>
        cy.request({
            method: "PUT",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers: {
                "Cookie": `token=${TOKEN}`
            },
            body: API_DATA.updateBookingInfo
        })

    const partialUpdateBooking = () =>
        cy.request({
            method: "PATCH",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${TOKEN}`
            },
            body: API_DATA.lapData.patchUpdate
        })

    const deleteBooking = () =>
        cy.request({
            method: "DELETE",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers: {
                "Cookie": `token=${TOKEN}`
            }
        })

    describe('Get all BookingIds', () => {
  
        it('Get all bookings', () => {
            getBookingIds()
            .then(response => {
                console.log(response)
            })
        });

        it('Verify response has headers', () => {
            getBookingIds()
            .then(response => {
                expect(response).to.have.property('headers')
            })
        });

        it('Verify response is array', () => {
            getBookingIds()
            .its('body')
            .should('is.an', 'array')
        });

        it('Verify response contain object with key bookingid', () => {
            getBookingIds()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.keys('bookingid')
            })
        });
    });

    describe('Create booking', () => {

        it('Verify response has key bookingid', () => {
            createBooking()
            .then(({ body }) => {
                expect(body).to.have.any.keys('bookingid')
                CREATED_BOOKINGID = body.bookingid
                console.log('CREATED_BOOKINGID = ', CREATED_BOOKINGID)
                console.log(body)
            })
        });
        
        it('Verify response status', () => {
            createBooking()
            .then(respons => {
                expect(respons.status).to.equal(200)
            })
        });
    });   

    describe('Verify created booking', () => {

        it('Verify status', () => {
            getCreatedBooking()
            .then(({ status }) => {
                expect(status).to.equal(200)
            })
        });

        it('Verify last name', () => {
            getCreatedBooking()
            .then(({ body }) => {
                expect(body.lastname).to.equal(API_DATA.bodyCreateBooking.lastname)
            })
        });

        it('Verify checkin date', () => {
            getCreatedBooking()
            .then(({ body }) => {
                expect(body.bookingdates.checkin).to.equal(API_DATA.bodyCreateBooking.bookingdates.checkin)
            })
        });

        it('Verify bodykeys in created booking', () => {
            getCreatedBooking()
            .then(({ body }) => {
                let responseBodyKeysArray = Object.keys(body)
                responseBodyKeysArray.forEach((el,i,arr) => {
                    expect(arr[i]).to.equal(API_DATA.arrOfBodyKeys[i])
                })
            })
        });

        it('Verify headers in created booking', () => {
            getCreatedBooking()
            .then(({ headers }) => {
                let responseHeadersKeysArray = Object.keys(headers)
                expect(responseHeadersKeysArray).to.deep.eq(API_DATA.arrOfHeadersKeys)
            })
        });
    });

    describe('Create token', () => {

        it('Verify token is created', () => {
            createToken()
            .then(({ body }) => {
                expect(body).to.have.key('token')
                TOKEN = body.token
            })
        });
    });

    describe('Update booking', () => {
  
        it('Verify status booking updates', () => {
            updateBooking()
            .then(({ status }) => {
                expect(status).to.equal(200)
            })
        });

        it('Verify lastname is updated', () => {
            getCreatedBooking()
            .then(({ body }) => {
                expect(body.lastname).to.equal(API_DATA.updateBookingInfo.lastname)
            })
        });
    });

    describe('Partial update booking', () => {

        it('Verify status', () => {
            partialUpdateBooking()
            .then(({ status }) => {
                expect(status).to.eq(200)
            })
        });

        it('Verify updated data and its type', () => {
            partialUpdateBooking()
            .then(({ body }) => {
                expect(body.additionalneeds).to.be.a('string')
                expect(body.additionalneeds).to.equal(API_DATA.lapData.patchUpdate.additionalneeds)
            })
        });    
    });

    describe('Delete booking', () => {

        it('Verify booking is deleted', () => {
            deleteBooking()
            .then(response => {
                expect(response.status).to.equal(201)
            })
        })
        
        it('Verify deleted booking dose not exist', () => {
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
                failOnStatusCode: false
            })
            .then(response => {
                expect(response.status).to.equal(404)
                expect(response.body).contains('Not Found')
            })
        })
    });
});