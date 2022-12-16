/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
let dataFixtures;
let CREATED_ID;
let TOKEN_AUTH;

describe('API Test Suit', () => {

    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            dataFixtures = data;
            return dataFixtures;
        });
    });
    
    describe('Get all Bookings', () => {
        
        const getResponse = () => 
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
        })

        it('GET all bookings', () => {
            getResponse()
            .then(response => {
                console.log(response)
                console.log(response.body);
                console.log(response.status);
                console.log(response.headers);
            })
        });

        it('Verify response ststus', () => {
            getResponse()
            .its('status')
            .should('be.eq', 200)
        });

        it('verify response has headers', () => {
            getResponse()
            .then(response => {
            console.log(response)
            expect(response).to.have.property('headers')
            })
        });

        it('verify response contains object with key bookingid', () => {
            getResponse()
            .its('body')
            .then(response => {
                expect(response[0]).to.have.keys('bookingid')
            })
        });

        it('verify response is array', () => {
            getResponse()
            .its('body')
            .should('be.an', 'array')
            })
        });

    describe('Create Booking', () => {
        const getCreateResponse = () =>
            cy.request({
              method: 'POST',
              url: `${API_BASE_URL}/booking`,
              body: dataFixtures.romData.create
        });

        const getCreateToken = () => 
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username" : dataFixtures.admin.username,
                "password" : dataFixtures.admin.password
            }
        });

        it('verify created token', () => {
            getCreateToken().then(({body}) => {
                expect(body).to.have.keys('token');
                TOKEN_AUTH = body.token;
            });
        });

        const getResponseID = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                failOnStatusCode: false
            });

        const getUpdateResponse = () =>
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${TOKEN_AUTH}`   
                },
                body: dataFixtures.romData.update
            });

        const getUpdateNameResponse = () =>
            cy.request({
                method: "PATCH",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${TOKEN_AUTH}`
                },
                body: dataFixtures.romData.partialUpdate
            })

            const getDeleteResponse = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": dataFixtures.romData.authorizationHeader,
                    "Cookie": `token=${TOKEN_AUTH}`
                }
            });

        it('print Response and verify status', () => {
            getCreateResponse()
            .then(response => {
                console.log(response.body)
                expect(response.status).to.equal(200)
                CREATED_ID = response.body.bookingid
                console.log('CREATED_ID = ', CREATED_ID)
            });
        });

        it('verify Response in body has firstName and lastName', () => {
            getResponseID()
            .then(({body}) => {
            expect(body.firstname).to.equal(dataFixtures.romData.create.firstname);
            expect(body.lastname).to.equal(dataFixtures.romData.create.lastname);
            });
        });

        it('verify Update Booking', () => {
            getUpdateResponse().then(({body}) => {
                expect(body.totalprice).to.eq(dataFixtures.romData.update.totalprice);
                expect(body.bookingdates.checkout).to.eq(dataFixtures.romData.update.bookingdates.checkout);
                expect(body.additionalneeds).to.eq(dataFixtures.romData.update.additionalneeds);

            });
        });

        it('verify Update Name', () => {
            getUpdateNameResponse().then(({body}) => {
                expect(body.firstname).to.eq(dataFixtures.romData.partialUpdate.firstname);
                expect(body.lastname).to.eq(dataFixtures.romData.partialUpdate.lastname); 
            })
        });

        it('verify UpdateCheckin', () => {
            getUpdateNameResponse().then(({body}) => {
                expect(body.bookingdates.checkin).to.eq(dataFixtures.romData.partialUpdate.bookingdates.checkin);
                expect(body.bookingdates.checkout).to.eq(dataFixtures.romData.partialUpdate.bookingdates.checkout);
            })
        });

        it('verify delet booking', () => {
            getDeleteResponse()
            .then(({body}) => {
                expect(body).to.equal("Created");
            });
        });

        it('verify booking has been deleted', () => {
            getResponseID().then(({status}) => {
                expect(status).to.eq(404);
            });
        });
    });
});