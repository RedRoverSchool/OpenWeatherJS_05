/// <reference types="cypress"/>


const apiData = require('../../fixtures/apiData.json')
const API_BASE_URL = Cypress.env('apiBaseUrl');
let AUTH_TOKEN;
let BOOKING_ID;

describe('andreyLapinSpec', () => {

    describe('Auth - CreateToken', () => {
        const createToken = () => {
            return cy.request({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/auth`,
                body: apiData.admin
            });
        }

        it('Verify Create Token', () => {
            createToken().then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body).to.have.property('token');
                expect(response.body).not.have.property('reason');
            });
        });

        it('TypeOf Token is String', () => {
            createToken().then((response) => {
                AUTH_TOKEN = response.body.token;
                expect(response.body.token).to.be.a('string')
            });
        });

    });

    describe('Create Booking', () => {
        const createBooking = () => {
            return cy.request({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/booking`,
                body: apiData.lapData.created
            });
        }

        it('Verify Create Booking status', () => {
            createBooking().then((response) => {
                expect(response.status).to.eql(200);
            });
        });

        it('Verify correct data response typeOf', () => {
            createBooking().then((response) => {
                let responseBody = response.body;
                Object.keys(responseBody).forEach(el => {
                    expect(responseBody[el]).to.be.a(apiData.lapData.correctDataReponseTypes[el])
                    if (el === 'booking') {
                        Object.keys(responseBody[el]).forEach(bookingItem => {
                            expect(responseBody[el][bookingItem]).to.be.a(apiData.lapData.correctBookingItems[bookingItem])
                            if (bookingItem === 'bookingdates') {
                                Object.keys(responseBody[el][bookingItem]).forEach(bookingdatesItem => {
                                    expect(isNaN(Date.parse(responseBody[el][bookingItem][bookingdatesItem]))).to.eql(false)
                                });
                            }
                        });
                    }

                });
            });
        });

        it('Verify correct data  in response body properties', () => {
            createBooking().then((response) => {
                BOOKING_ID = response.body.bookingid;
                let responseBody = response.body;
                Object.keys(responseBody).forEach((el, index) => {
                    expect(el).to.be.eql(apiData.lapData.correctDataReponseProperties.obj[index])
                    if (el === 'booking') {
                        Object.keys(responseBody[el]).forEach((bookingItem, indexBookingItem) => {
                            expect(bookingItem).to.be.eql(apiData.lapData.correctDataReponseProperties.booking[indexBookingItem])
                            if (bookingItem === 'bookingdates') {
                                Object.keys(responseBody[el][bookingItem]).forEach((bookingdatesItem, indexBookingdatesItem) => {
                                    expect(bookingdatesItem).to.eql(apiData.lapData.correctDataReponseProperties.bookingdates[indexBookingdatesItem])
                                });
                            }
                        });
                    }

                });
            });
        });

        it('Verify correct date checkin/checkout', () => {
            createBooking().then(({ body }) => {
                expect(new Date(body.booking.bookingdates.checkout)).to.be.above(new Date(body.booking.bookingdates.checkin))
            })
        })
    });
    describe('GetBooking', () => {
        const getBooking = () => {
            return cy.request({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            });
        }

        it('Verify GetBooking status', () => {
            getBooking().then((response) => {
                expect(response.status).to.eql(200)
            });
        });

        it('Verify GetBooking data body response', () => {
            getBooking().then(({ body }) => {
                expect(body).to.deep.eql(apiData.lapData.created)
            });
        });

        it('Verify GetBooking data headers', () => {
            getBooking().then(({ headers }) => {
                cy.log(JSON.stringify(headers))
                expect(headers).to.be.a('object')
                expect(Object.entries(headers)).to.have.length(apiData.lapData.getBookingHeaders.properties.length)
                expect(Object.keys(headers)).to.deep.eql(apiData.lapData.getBookingHeaders.properties)
                expect(headers).to.deep.include(apiData.lapData.getBookingHeaders['content-type'])
            });
        });
    });

    describe('UpdateBooking', () => {
        let newPutData = JSON.parse(JSON.stringify(apiData.lapData.created));
        newPutData.firstname = "Andrew";

        const getBooking = () => {
            return cy.request({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            });
        }
        const updateBookingPut = () => {
            return cy.request({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${AUTH_TOKEN}`
                },
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                body: newPutData
            });
        }

        it('Verify UpdateBooking changes', () => {
            let beforeFirstName;

            getBooking().then(({ body }) => {
                beforeFirstName = body.firstname
            });
            updateBookingPut().then((response) => {
                let currentFirstName = response.body.firstname;
                expect(response.status).to.be.eql(200)
                expect(currentFirstName).not.be.eql(beforeFirstName) // Andrew !== Andrey
                expect(response.body).to.deep.eql(newPutData)
            });
        });
        
        it('Verify UpdateBooking data headers', () => {
            updateBookingPut().then(({ headers }) => {
                expect(Object.entries(headers)).to.have.length(apiData.lapData.getBookingHeaders.properties.length)
                expect(Object.keys(headers)).to.deep.eql(apiData.lapData.getBookingHeaders.properties)
                expect(headers).to.deep.include(apiData.lapData.getBookingHeaders['content-type'])
            });
        });

    });

    describe('PartialUpdateBooking', () => {
        const getBooking = () => {
            return cy.request({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
            });
        }

        const updateBookingPatch = () => {
            return cy.request({
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${AUTH_TOKEN}`
                },
                url: `${API_BASE_URL}/booking/${BOOKING_ID}`,
                body: apiData.lapData.patchUpdate
            });
        }

        it('Verify PartialUpdateBooking changes', () => {
            let additionalneeds;

            getBooking().then(({ body }) => {
                additionalneeds = body.additionalneeds;
            });
            updateBookingPatch().then((response) => {
                expect(response.status).to.be.eql(200)
                expect(response.body.additionalneeds).not.be.eql(additionalneeds) // get Offer !== Offer
            });
        });

        it('Vetify PartialUpdateBooking data headers', () => {
            updateBookingPatch().then(({ headers }) => {
                expect(Object.entries(headers)).to.have.length(apiData.lapData.getBookingHeaders.properties.length)
                expect(Object.keys(headers)).to.deep.eql(apiData.lapData.getBookingHeaders.properties)
                expect(headers).to.deep.include(apiData.lapData.getBookingHeaders['content-type'])
            });
        });
    });

});