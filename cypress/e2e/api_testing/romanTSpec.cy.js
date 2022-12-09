/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl');
let CREATED_MY_ID;
let dataFixtures;

describe('romanTSpec', () => {
    
    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            dataFixtures = data;
            return dataFixtures;
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

    describe('create, verify and delete my booking', () => {
        
        const getCreateResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "firstname" : dataFixtures.romData.firstname,
                    "lastname" : dataFixtures.romData.lastname,
                    "totalprice" : dataFixtures.romData.totalprice,
                    "depositpaid" : dataFixtures.romData.depositpaid,
                    "bookingdates" : {
                        "checkin" : dataFixtures.romData.bookingdates.checkin,
                        "checkout" : dataFixtures.romData.bookingdates.checkout
                    },
                    "additionalneeds" : dataFixtures.romData.additionalneeds
                }
            });
        
        const getResponse = () => 
            cy.request(`${API_BASE_URL}/booking?firstname=${dataFixtures.romData.firstname}&lastname=${dataFixtures.romData.lastname}`);

        const getResponseID = () =>
            cy.request(`${API_BASE_URL}/booking/${CREATED_MY_ID}`);
        
        const getDeleteResponse = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_MY_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
                }
            });

        it('verify response status', () => {
            getCreateResponse().then((response) => {
                expect(response.status).to.eq(200)
                CREATED_MY_ID = response.body.bookingid;
            });
        });

        it('verify response in body has my bookingid', () => {
            getResponse().then(response => {
                expect(response.body[0].bookingid).to.eq(CREATED_MY_ID)
            });
        });

        it('verify response in body has firstName and lastName', () => {
            getResponseID().then(response => {
                expect(response.body.firstname).to.eq(dataFixtures.romData.firstname);
                expect(response.body.lastname).to.eq(dataFixtures.romData.lastname);
            });
        });

        it('Verify response message on delete booking', () => {
            getDeleteResponse().then(response => {
                expect(response.body).to.eq("Created");
            });
        });
    });
});
