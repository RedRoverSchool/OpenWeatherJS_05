/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env("apiBaseUrl")
const apiData = require("../../fixtures/apiData.json")
let CREATED_ID

describe("yuliaLopatkoSpec", () => {
  describe("Create booking", () => {
    const createBookingRequest = () =>
      cy.request({
        method: "POST",
        url: `${API_BASE_URL}/booking`,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstname: apiData.firstname,
          lastname: apiData.lastname,
          totalprice: apiData.totalprice,
          depositpaid: apiData.depositpaid,
          bookingdates: {
            checkin: apiData.bookingdates.checkin,
            checkout: apiData.bookingdates.checkout,
          },
          additionalneeds: apiData.additionalneeds,
        },
      })

    it("verify that request creates booking", () => {
      createBookingRequest().then((response) => {
        expect(response.body.booking.lastname).to.equal("Brown")
      })
    })

    describe("Get booking Ids", () => {
      const getBookingIds = () => cy.request(`${API_BASE_URL}/booking`)

      it("verify response status", () => {
        getBookingIds().then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })
  describe.only("Get booking by filter lastname", () => {
    const filterByLastName = () =>
      cy.request({
        method: "GET",
        url: `${API_BASE_URL}/booking?lastname=${apiData.lastname}`,
      })

    it("verify status", () => {
      filterByLastName().then((response) => {
        expect(response.status).to.be.equal(200)
      })
    })
  })
})
