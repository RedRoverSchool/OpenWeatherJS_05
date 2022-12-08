/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

let CREATED_TOKEN

describe("API with Cypress", () => {

    describe("Create Token", () => {

        const getResponse = () => 
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/auth`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                        "username" : "admin",
                        "password" : "password123"
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
})
})
