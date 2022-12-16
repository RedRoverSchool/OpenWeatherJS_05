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

    describe("Booking - GetBooking test suite", () => {

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

        it("Verify random Booking body response type is object ", function () {
            cy.request(`${API_BASE_URL}/booking/${this.bookingRequest}`)
                .should(({ body }) => {
                    expect(body).to.be.an('object')
                })
        });

        it("Verify random Booking body response key's data type ", function () {
            cy.request(`${API_BASE_URL}/booking/${this.bookingRequest}`)
                .should(({ body }) => {
                    for (let key in body) {
                        expect(typeof body[key]).to.eq(apiData.timothyData.booking.dataType[key])
                    }
                })
        });
    });

    describe('Booking - Create booking test suite', () => {

        let createBookingResponse
        let createBookingNoFirstNameResponse
        let createBookingNoAdditionalneedsResponse

        before('Create Booking and return its ID', () => {
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                body: apiData.timothyData.createBooking.createBookingValidBody
            }).then((response) => {
                createBookingResponse = response
            });

            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                body: apiData.timothyData.createBooking.createBookingNoFirstNameBody,
                failOnStatusCode: false
            }).then((response) => {
                createBookingNoFirstNameResponse = response
            });

            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                body: apiData.timothyData.createBooking.createBookingNoAdditionalneedsBody,
                failOnStatusCode: false
            }).then((response) => {
                createBookingNoAdditionalneedsResponse = response
            })

        });

        it('Verify after creating a booking it has all the passed values', () => {
            expect(createBookingResponse.body.booking).to.be.eql(apiData.timothyData.createBooking.createBookingValidBody)
        })

        it('Verify createBookingResponse status is 200', () => {
            expect(createBookingResponse.status).to.eq(200)
        });

        it('Verify data type of ID is a number', () => {
            expect(createBookingResponse.body.bookingid).to.be.a("number")
        });

        it('Verify after creating a booking it has all the passed keys', () => {
            expect(createBookingResponse.body.booking).has.all.keys(apiData.timothyData.createBooking.createBookingValidBody)
        });

        it('Verify the data type of created booking keys value ', () => {
            for (let key in createBookingResponse.body.booking) {
                expect(typeof createBookingResponse.body.booking[key]).to.be.eq(apiData.timothyData.booking.dataType[key])
            }
        });

        it('Verify the booking statusText is OK ', () => {
            expect(createBookingResponse.statusText).to.be.eq("OK")
        });

        it('Negative - No firstname passed in the request. Verify the booking status is 500 ', () => {
            expect(createBookingNoFirstNameResponse.status).to.be.eq(500)
        });

        it('Negative - No firstname passed in the request. Verify key isOkStatusCode is equal to false ', () => {
            expect(createBookingNoFirstNameResponse.isOkStatusCode).to.be.false
        });

        it('Negative - No firstname passed in the request. Verify key body is equal to "Internal Server Error" ', () => {
            expect(createBookingNoFirstNameResponse.body).to.be.eq("Internal Server Error")
        });

        it('Negative - No additionalneeds passed in the request. Verify status is equal 200', () => {
            expect(createBookingNoAdditionalneedsResponse.status).to.be.eql(200)
        });

        it('Negative - No additionalneeds passed in the request. Verify booking created without additionalneeds key ', () => {
            expect(createBookingNoAdditionalneedsResponse.body.booking).to.be.eql(apiData.timothyData.createBooking.createBookingNoAdditionalneedsBody)
        });
    })
})