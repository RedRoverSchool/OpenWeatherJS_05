/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env("apiBaseUrl")

describe("Api test suit", () => {
  describe("Create booking", () => {
    const createBookingRequest = () =>
      cy.request({
        method: "POST",
        url: `${API_BASE_URL}/booking`,

        body: {
          firstname: "Jim",
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01",
          },
          additionalneeds: "Breakfast",
        },
      })

    it.only("verify that request creates booking", () => {
      createBookingRequest().then((response) => {
        expect(response.body.booking.lastname).to.equal("Brown")
      })
    })

    describe("Get booking Ids", () => {
      const getBookingIds = () => cy.request(`${API_BASE_URL}/booking`)

      it("verify response status", () => {
        getBookingIds().then((response) => {
          expect(response.status).to.eq(200)
          cy.log(response.body)
        })
      })
    })
  })
})
