/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
let CREATED_MY_ID;
let TOKEN_AUTH;
let dataFixtures;

describe('romanTSpec', () => {
    
    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            dataFixtures = data;
            return dataFixtures;
        });
    });
    
    describe('Auth - CreateToken', () => {
        
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
    });

    describe('GET - GetBookingIds', () => {
        
        const getResponse = () => 
            cy.request(`${API_BASE_URL}/booking`);

        it('verify response status', () => {
            getResponse().then(({status}) => {
                expect(status).to.eq(200);
            });
        });
    });

    describe('create, verify, update and delete my booking', () => {
        
        const getCreateResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: dataFixtures.romData.create
            });
        
        const getResponse = () => 
            cy.request(`${API_BASE_URL}/booking?firstname=${dataFixtures.romData.create.firstname}&lastname=${dataFixtures.romData.create.lastname}`);

        const getResponseID = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking/${CREATED_MY_ID}`,
                failOnStatusCode: false
            });

        const getUpdateResponse = () =>
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${CREATED_MY_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${TOKEN_AUTH}`
                },
                body: dataFixtures.romData.update
            });

        const getPartialUpdateResponse = () =>
            cy.request({
                method: "PATCH",
                url: `${API_BASE_URL}/booking/${CREATED_MY_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${TOKEN_AUTH}`
                },
                body: dataFixtures.romData.partialUpdate
            });
        
        const getDeleteResponse = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_MY_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": dataFixtures.romData.authorizationHeader,
                    "Cookie": `token=${TOKEN_AUTH}`
                }
            });

        it('verify response status', () => {
            getCreateResponse().then(({status, body}) => {
                expect(status).to.eq(200)
                CREATED_MY_ID = body.bookingid;
            });
        });

        it('verify response in body has my bookingid', () => {
            getResponse().then(({body}) => {
                expect(body[0].bookingid).to.eq(CREATED_MY_ID)
            });
        });

        it('verify response in body has firstName and lastName', () => {
            getResponseID().then(({body}) => {
                expect(body.firstname).to.eq(dataFixtures.romData.create.firstname);
                expect(body.lastname).to.eq(dataFixtures.romData.create.lastname);
            });
        });

        it('verify response status update booking', () => {
            getUpdateResponse().then(({status}) => {
                expect(status).to.eq(200);
            });
        });

        it('verify update booking', () => {
            getUpdateResponse().then(({body}) => {
                expect(body.totalprice).to.eq(dataFixtures.romData.update.totalprice);
                expect(body.bookingdates.checkout).to.eq(dataFixtures.romData.update.bookingdates.checkout);
                expect(body.additionalneeds).to.eq(dataFixtures.romData.update.additionalneeds);
            });
        });

        it('verify response status partial update booking', () => {
            getPartialUpdateResponse().then(({status}) => {
                expect(status).to.eq(200);
            });
        });

        it('verify partial update booking: firstname, lastname and bookingdates', () => {
            getPartialUpdateResponse().then(({body}) => {
                expect(body.firstname).to.eq(dataFixtures.romData.partialUpdate.firstname);
                expect(body.lastname).to.eq(dataFixtures.romData.partialUpdate.lastname);
                expect(body.bookingdates.checkin).to.eq(dataFixtures.romData.partialUpdate.bookingdates.checkin);
                expect(body.bookingdates.checkout).to.eq(dataFixtures.romData.partialUpdate.bookingdates.checkout);
            });
        });

        it('Verify response message on delete booking', () => {
            getDeleteResponse().then(({body}) => {
                expect(body).to.eq("Created");
            });
        });

        it('verify booking has been deleted', () => {
            getResponseID().then(({status}) => {
                expect(status).to.eq(404);
            });
        });
    });
});
