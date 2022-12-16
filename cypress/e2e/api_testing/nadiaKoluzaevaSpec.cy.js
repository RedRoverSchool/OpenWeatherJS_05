/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

let CREATED_TOKEN
let CREATED_ID
let dataFixtures

describe("API with Cypress", () => {

    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            dataFixtures = data;
            return dataFixtures;
        });
    });

    describe("Create Token", () => {

        const getResponse = () => 
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
            })
        
        it('verify response status', () => {
            getResponse()
                .its('status')
                .should('be.eq', 200)
        })
    
        it('verify response statusCodeTrue', () => {
            getResponse()
                .its('isOkStatusCode')
                .should('be.true')
        })

        it('verify response has body', () => {
            getResponse()
            .then(response => {
                console.log(response)
                expect(response).to.have.property('body')
            })
        })

        it('save token key to variable', () => {
            getResponse()
            .then(response => {
                expect(response.status).to.equal(200)
                    CREATED_TOKEN = response.body.token
                    console.log('CREATED_TOKEN = ', CREATED_TOKEN)
            
            })
        })  

        it('verify body response is not an empty', () => {
            getResponse()
            .its('body')
            .should('not.be.empty')
            })

        it('verify body response key', () => {
            getResponse()
            .its('body')
            .then(response => {
            for(let key in response) {
                if(key == 'token') {
                    console.log(`${key} - ${response[key]}`)
                }
                else{
                    console.log("nooooooooooooooooo")
                }
            }
        })
    })
    
    describe("Create and delete Booking", () => {

        const getCreatedResponse = () => 
            cy.request({
            method: 'POST',
            url: `${API_BASE_URL}/booking`,
            body: dataFixtures.nadiaData.create
        })
    
        it('verify response status', () => {
            getCreatedResponse().then(({status, body}) => {
                expect(status).to.eq(200)
                CREATED_ID = body.bookingid
            })
        })

        it('verify response body has firstName', () => {
            getCreatedResponse().then(({body}) => {
                expect(body.booking.firstname).to.eq(dataFixtures.nadiaData.create.firstname)
            })
        })

        it('verify response depositpaid = true', () => {
            getCreatedResponse().then(({body}) => {
                expect(body.booking.depositpaid).to.eq(dataFixtures.nadiaData.create.depositpaid)  
            })
        })

        const getUpdatedResponse = () =>
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${CREATED_TOKEN}`
            },
            body: dataFixtures.nadiaData.update
        })

        
        it('verify response status', () => {
            getUpdatedResponse().then(({status}) => {
                expect(status).to.eq(200);
            })
        })

        it('verify response body update has firstName ', () => {
            getUpdatedResponse().then(({body}) => {
                expect(body.firstname).to.eq(dataFixtures.nadiaData.update.firstname)
            })
        })

        it('verify response body update has bookingdates', () => {
            getUpdatedResponse().then(({body}) => {
                expect(body.bookingdates.checkin).to.eq(dataFixtures.nadiaData.update.bookingdates.checkin)
                expect(body.bookingdates.checkout).to.eq(dataFixtures.nadiaData.update.bookingdates.checkout)
            })
        })

        it('verify response body update has additionalneeds ', () => {
            getUpdatedResponse().then(({body}) => {
                expect(body.additionalneeds).to.eq(dataFixtures.nadiaData.update.additionalneeds)
            })
        })

        const getDeletedResponse = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATED_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": dataFixtures.nadiaData.authorizationHeader,
                    "Cookie": `token=${CREATED_TOKEN}`
                }
            })

            it('verify booking has been deleted', () => {
                getDeletedResponse().then(({status}) => {
                    expect(status).to.eq(201)
                })
            })

        })
    })
})