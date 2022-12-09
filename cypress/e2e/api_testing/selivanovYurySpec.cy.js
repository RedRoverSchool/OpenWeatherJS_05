/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')

describe ('selivanovYurySpec', function() {

    beforeEach(function () {
        cy.fixture('apiData').then(data => {
            this.data = data;            
        });
    });

    describe ('Get method testing', function() {

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })
        

        it('verify satatus code', function() {
            getResponse()
                .then(({status}) => {
                    expect(status).to.eq(200)
                })
        })

        it('verify there are all headers', function() {
            getResponse()
                .then(({headers}) => {   
                    let hedersKeys = []                 
                    for(let key in headers) {
                       hedersKeys.push(key)
                    }  

                hedersKeys.forEach((el, i, arr) => {
                    expect(arr[i].toLowerCase()).to.eq(this.data.getHeaders[i].toLowerCase())
                    })  
                })           
        })
        
        it('verify response has duration', function() {
            getResponse()
                .then((response) => {
                    expect(response).to.have.property('duration')
                })
        })
    })
})
