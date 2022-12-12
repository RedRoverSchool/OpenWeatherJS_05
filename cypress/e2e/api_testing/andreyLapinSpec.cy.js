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

    describe('Booking', () => {
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

        const getBookingIds = () => {
            return cy.request({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${API_BASE_URL}/booking`,
            });
        }

        it('Create Booking', () => {
            createBooking().then((response) => {
                expect(response.status).to.eql(200);
            });
        });

        it('Verify correct data response typeOf', () => {
            createBooking().then((response) => {
                let responseBody = response.body;
                Object.keys(responseBody).forEach(el => {
                    expect(responseBody[el]).to.be.a(apiData.lapData.correctDataReponseTypes[0][el])
                    if (typeof (responseBody[el]) === 'object') {
                        Object.keys(responseBody[el]).forEach(bookingItem => {
                            expect(responseBody[el][bookingItem]).to.be.a(apiData.lapData.correctDataReponseTypes[1][bookingItem])
                            if (typeof (responseBody[el][bookingItem]) === 'object') {
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
                Object.keys(responseBody).forEach((el,index) => {
                    expect(el).to.be.eql(apiData.lapData.correctDataReponseProperties[0][index])
                    if (typeof (responseBody[el]) === 'object') {
                        Object.keys(responseBody[el]).forEach((bookingItem, indexBookingItem) => {
                            expect(bookingItem).to.be.eql(apiData.lapData.correctDataReponseProperties[1][indexBookingItem])
                            if (typeof (responseBody[el][bookingItem]) === 'object') {
                                Object.keys(responseBody[el][bookingItem]).forEach((bookingdatesItem, indexBookingdatesItem)  => {
                                    expect(bookingdatesItem).to.eql(apiData.lapData.correctDataReponseProperties[2][indexBookingdatesItem])
                                });
                            }
                        });
                    }

                });
            });
        });
        
        // it('Verify GetBookingIds', () => {
        //     getBookingIds().then((response) => {
        //         cy.log(JSON.stringify(response))
        //     })
        // })

        });

});
