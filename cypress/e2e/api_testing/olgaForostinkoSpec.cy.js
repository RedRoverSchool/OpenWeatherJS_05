/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const API_DATA = require('../../fixtures/apiData.json')
let CREATED_BOOKINGID
let NEW_TOKEN


describe("OlgaForostinkoSpec", () => {

    describe("Get BookingId Tests", () => {

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })

        it('Verify response has a body', () => {
            getResponse()
                .then(response => {
                    console.log(response)
                    expect(response).to.have.property('body')
                })
        })

        it('Verify response status', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })

        it('Verify response has headers', () => {
            getResponse()
                .then(response => {
                    expect(response).to.have.property('headers')
                })
        })

        it('Verify response statusText', () => {
            getResponse()
                .then(response => {
                    console.log(response.statusText)
                })
        })

        it('Verify response has requestHeaders', () => {
            getResponse()
                .then(response => {
                    expect(response).to.have.property('requestHeaders')
                })
        })

        it('Verify response body is an array', () => {
            getResponse()
                .its('body')
                .should('be.an', 'array')
        });

        it('Verify response body has BookingId', () => {
            getResponse()
                .its('body')
                .then(response => {
                    expect(response[0]).to.have.property('bookingid')
                })
        })

        it('Verify response body has a duration', () => {
            getResponse()
                .then(response => {
                    expect(response).to.have.property('duration')
                })
        })

        it('Verify tatus - anoter option', () => {
            getResponse()
                .then(response => {
                    expect(response).to.have.property('status', 200)
                })
        })

    describe('Create, create token, verify, update, partial', () => {

        const createToken = () => 
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth`,
            geaders: API_DATA.headersAccept,
            body: API_DATA.admin
        })
        
        const createBooking = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: API_DATA.headersContentType,
                body: API_DATA.bodyCreateBooking
            })

        const createdBooking = () =>
        cy.request({
            method: "GET",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`
        })

        const updateBooking = () =>
        cy.request({
            method: "PUT",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers: {
                "Cookie": `token=${NEW_TOKEN}`
            },
            body: API_DATA.updateBookingInfo
        })

        const partialUpdateBooking = () =>
        cy.request({
            method: "PATCH",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers: {
                "Cookie": `token=${NEW_TOKEN}`
            },
            body: API_DATA.romData.partialUpdate
        })
    
    describe('1. Auth - Create Token', () => {

        it('Verify token is created', () => {
            createToken().then(({ body }) => {
                expect(body).to.have.key('token')
                NEW_TOKEN = body.token
            })    
        });       
    })

    describe('2. Create booking', () => {
        
        it('Verify status is created', () => {
            createBooking().then(({ status }) => {
                    expect(status).to.eq(200)
                })
        });

        it('Verify responce has key bookingId', () => {
            createBooking().then(({ body }) => {
                    expect(body).to.have.any.keys('bookingid')
                    CREATED_BOOKINGID = body.bookingid
                    console.log('CREATED_BOOKINGID ', CREATED_BOOKINGID)
                    console.log(body)
                })
        })

    describe('3. Verify created booking', () => {

        it('Verify status', () => {
            createdBooking().then(({ status }) => {
                    expect(status).to.eq(200)
                })
        })

        it('Verify first name', () => {
            createdBooking().then(({ body }) => {
                expect(body.firstname).to.eq(API_DATA.bodyCreateBooking.firstname)
            })    
        })

        it('Verify checkout', () => {
            createdBooking().then(({ body }) =>{
                expect(body.bookingdates.checkout).to.eq(API_DATA.bodyCreateBooking.bookingdates.checkout)
            })    
        })

    describe('4. Update booking', () => {

        it('Verify status booking updates', () => {
            updateBooking().then(({ status }) => {
                expect(status).to.eq(200)
            })    
        })
        
        it('Verify first name is updated', () => {
            updateBooking().then(({ body}) => {
                expect(body.firstname).to.eq(API_DATA.updateBookingInfo.firstname)
            })    
        })
      
    describe('5. Partial Update Booking', () => {

        it('Verify firstname partial update booking', () => {
            partialUpdateBooking().then(({ body }) => {
                expect(body.firstname).to.eq(API_DATA.romData.partialUpdate.firstname)
            })    
        })
    })
    
    describe('6. Delete Booking', () => {

        const deleteBooking = () =>
        cy.request({
            method: "DELETE",
            url: `${API_BASE_URL}/booking/${CREATED_BOOKINGID}`,
            headers: {
                "Authorization": API_DATA.headersContentType,
                "Cookie": `token=${NEW_TOKEN}`
            },
            failOnStatusCode: false    
        })

        it('Verify that default HTTP 201 response', () => {
            deleteBooking().then(({ status }) => {
                expect(status).to.eq(201)
            })            
        })

        it('The error message "Method Not Allowed" appears when we Get not existing booking by ID', () => {
            deleteBooking().then(({ body }) => {
                cy.log(body)
                expect(body).to.contain("Method Not Allowed")
            })    
        })
    })

    describe('7. Ping - HealthCheck', () => {

        const getResponceOfServer = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/ping`
            })

        it('Verify that server response with ping', () => {
            getResponceOfServer().then(({ status }) => {
                expect(status).to.eq(201)
            })   
        })    
    });
})
    })
})
    })
})
})    