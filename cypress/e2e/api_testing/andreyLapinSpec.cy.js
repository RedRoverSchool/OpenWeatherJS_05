/// <reference types="cypress"/>


const apiData = require('../../fixtures/apiData.json')
const API_BASE_URL = Cypress.env('apiBaseUrl');
let AUTH_TOKEN;

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
                AUTH_TOKEN = response.body.token;
            });
        });

        it('TypeOf Token is String', () => {
            createToken().then((response) => {
                expect(response.body.token).to.be.a('string')
            });
        });

    });

    describe('Create Create Booking', () => {
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
                BOOKING_ID = response.body.bookingid
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
                            if (bookingItem === 'correctBookingdatesItems') {
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
            getBooking().then(({headers}) => {
                cy.log(JSON.stringify(headers))
                expect(headers).to.be.a('object')
                expect(Object.entries(headers)).to.have.length(apiData.lapData.getBookingHeaders.properties.length)
                expect(Object.keys(headers)).to.deep.eql(apiData.lapData.getBookingHeaders.properties)
                expect(headers).to.deep.include(apiData.lapData.getBookingHeaders['content-type'])
            })
        })
        it('Verify GetBooking data headers', () => {
            getBooking().then(({ headers }) => {
                cy.log(JSON.stringify(headers))
                expect(headers).to.be.a('object')
                expect(Object.entries(headers)).to.have.length(apiData.lapData.getBookingHeaders.properties.length)
                expect(Object.keys(headers)).to.deep.eql(apiData.lapData.getBookingHeaders.properties)
                expect(headers).to.deep.include(apiData.lapData.getBookingHeaders['content-type'])
            })
        })
    });


});