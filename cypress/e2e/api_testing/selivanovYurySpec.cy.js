/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env('apiBaseUrl')
const apiData = require('../../fixtures/apiData.json')

describe('selivanovYurySpec', function () {

    describe('Get method testing', function () {

        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`
            })


        it('verify satatus code', function () {
            getResponse()
                .then(({ status }) => {
                    expect(status).to.eq(200)
                })
        })

        it('verify there are all headers', function () {
            getResponse()
                .then(({ headers }) => {
                    let hedersKeys = []
                    for (let key in headers) {
                        hedersKeys.push(key)
                    }

                    hedersKeys.forEach((el, i, arr) => {
                        expect(arr[i].toLowerCase()).to.eq(apiData.getHeaders[i].toLowerCase())
                    })
                })
        })

        it('verify response has duration', function () {
            getResponse()
                .then((response) => {
                    expect(response).to.have.property('duration')
                })
        })
    })

    describe('Post method testing', function () {

        const getResponse = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: apiData.headersContentType,
                body: apiData.bodyCreateBooking
            })

        it('verify response satus', function () {
            getResponse()
                .then(({ status }) => {
                    expect(status).to.eq(200)
                })
        })

        it('verify response body data', function () {
            getResponse()
                .then((response) => {
                    expect(response.body.booking.firstname).to.eq(apiData.bodyCreateBooking.firstname)
                    expect(response.body.booking.lastname).to.eq(apiData.bodyCreateBooking.lastname)
                })
        })

    })
})
