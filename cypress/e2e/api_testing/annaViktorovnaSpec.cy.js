/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env("apiBaseUrl");
const apiData = require("../../fixtures/apiData.json");
let CREATED_ID;
const VALIDATE_DATE = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

describe("API testing with Cypress", () => {
    describe("Get BookingIds", () => {
        const getResponse = () =>
            cy.request({
                method: "GET",
                url: `${API_BASE_URL}/booking`,
            });

        it("verify response has headers", () => {
            getResponse().then((response) => {
                console.log(response);
                expect(response).to.have.property("headers");
            });
        });

        it("verify response has status 200", () => {
            getResponse()
                .its("status")
                .should("be.eq", 200);
        });

        it("verify response is array", () => {
            getResponse()
                .its("body")
                .should("be.an", "array");
        });

        it("verify response body has BookingId", () => {
            getResponse()
                .its("body")
                .then((response) => {
                    expect(response[0]).to.have.property("bookingid");
                });
        });

        it("verify response body ia array", () => {
            getResponse()
                .its("body")
                .should("be.an", "array");
        });
    });

    describe("Create Bookings", () => {
        const createResponse = () =>
            cy.request({
                method: "POST",
                url: `${API_BASE_URL}/booking`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    firstname: "Test",
                    lastname: "Test",
                    totalprice: 111,
                    depositpaid: true,
                    bookingdates: {
                        checkin: "2013-02-23",
                        checkout: "2014-10-23",
                    },
                },
            });

        it("verify response body is an Object", () => {
            createResponse()
                .its("body")
                .should("be.an", "object");
        });

        it("verify request creates booking", () => {
            createResponse().then((response) => {
                expect(response.body.booking.lastname).to.equal("Test");
            });
        });

        it("verify that total price is number and equal 111", () => {
            createResponse().then((response) => {
                expect(response.body.booking.totalprice).to.be.a("number").to.be.equal(111);
            });
        });

        it("verify that depositpaid is true", () => {
            createResponse()
                .then((response) => {
                expect(response.body.booking.depositpaid).to.eq(true);
            });
        });

        it("verify that checkin is data", () => {
            createResponse().then((response) => {
                expect(response.body.booking.bookingdates.checkin).to.match(VALIDATE_DATE);
            });
        });

        it("verify that checkout is data", () => {
            createResponse()
                .then((response) => {
                expect(response.body.booking.bookingdates.checkout).to.match(VALIDATE_DATE);
            });
        });

        it("verify depositpaid is boolean", () => {
            createResponse()
                .then(response => {
                    expect(response.body.booking.depositpaid).to.be.a(apiData.typeBoolean);
                });
        });
    });
});
