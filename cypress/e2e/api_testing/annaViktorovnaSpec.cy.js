/// <reference types="cypress"/>

const API_BASE_URL = Cypress.env("apiBaseUrl");
const apiData = require("../../fixtures/apiData.json");
const VALIDATE_DATE = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
let CREATE_ID;
let TOKEN;

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
                expect(response).to.have.property("headers").to.not.be.empty;
            });
        });

        it("verify response has status 200", () => {
            getResponse().its("status").should("be.eq", 200);
        });

        it("verify response body has BookingId", () => {
            getResponse()
                .its("body")
                .then((response) => {
                    expect(response[0]).to.have.property("bookingid");
                });
        });

        it("verify response body ia array", () => {
            getResponse().its("body").should("be.an", "array");
        it("verify response body ia an array", () => {
            getResponse().its("body").should("be.an", "array");
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

        it("verify that total price is number and equal 111", () => {
            createResponse().then((response) => {
                expect(response.body.booking.totalprice)
                    .to.be.a("number")
                    .to.be.equal(111);
            });
        });

        it("verify that depositpaid is true", () => {
            createResponse().then((response) => {
                expect(response.body.booking.depositpaid)
                
                .to.eq(true);
            });
        });

        it("verify response body is an Object", () => {
            createResponse().its("body").should("be.an", "object");
        });

        it("verify response has lastName 'Test' and not empty", () => {
            createResponse().then((response) => {
                expect(response.body.booking.lastname)
                    .to.equal("Test")
                    .to.be.a("string")
                    .to.not.be.empty;
            });
        });

        it("verify response has new booking id", () => {
            createResponse().then((response) => {
                expect(response.status).to.equal(200);
                CREATE_ID = response.body.bookingid;
            });
        });

        it("verify that total price is bigger then 0", () => {
            createResponse().then((response) => {
                expect(response.body.booking.totalprice).gte(1);
            });
        });

        it("verify that depositpaid is true", () => {
            createResponse().then((response) => {
                expect(response.body.booking.depositpaid).to.eq(true);
            });
        });

        it("verify that depositpaid is an object", () => {
            createResponse().then((response) => {
                expect(response.body.booking.bookingdates)
                .to.be.a("object");
            });
        });

        it("verify that checkin is data", () => {
            createResponse().then((response) => {
                expect(response.body.booking.bookingdates.checkin)
                .to.match(VALIDATE_DATE);
            });
        });

        it("verify that checkout is data", () => {
            createResponse().then((response) => {
                expect(response.body.booking.bookingdates.checkout)
                .to.match(VALIDATE_DATE);
            });
        });

        it("verify date checkin early then checkout", () => {
            createResponse().then(({ body }) => {
                expect(new Date(body.booking.bookingdates.checkout))
                .to.be.above(new Date(body.booking.bookingdates.checkin));
            });
        });

        it("verify depositpaid is boolean", () => {
            createResponse().then((response) => {
                expect(response.body.booking.depositpaid)
                .to.be.a(apiData.typeBoolean);
            });
        });

    describe("UpdateBooking", () => {
        const updateBooking = () =>
            cy.request({
                method: "PUT",
                url: `${API_BASE_URL}/booking/${CREATE_ID}`,
                headers: {
                    Cookie: `token=${TOKEN}`,
                    Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
                    },
                body: {
                    firstname: "James",
                    lastname: "Brown",
                    totalprice: 111,
                    depositpaid: true,
                    bookingdates: {
                        checkin: "2018-01-01",
                        checkout: "2019-01-01",
                        },
                    additionalneeds: "Breakfast",
                    },
        });

        it("verify depositpaid has status 200", () => {
            updateBooking().then((response) => {
                expect(response.status).to.equal(200);
            });
        });


        it("verify additionalneeds is equal breakfast", () => {
            updateBooking().then((response) => {
                    expect(response.body.additionalneeds).to.eq("Breakfast");
                });
            });

        it("verify update booking has keys", () => {
            updateBooking()
                .its("body")
                .then((response) => {
            expect(response).to.have.any.keys(
                    "firstname",
                    "lastname",
                    "additionalneeds",
                    "depositpaid"
                );
            });

        const deleteBooking = () =>
            cy.request({
                method: "DELETE",
                url: `${API_BASE_URL}/booking/${CREATE_ID}`,
                headers: {
                    "Content-Type": "application/json",
                Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
                Cookie: `token=${TOKEN}`,
                        },
            });

        it("verify response message is created", () => {
            deleteBooking().then(({ body }) => {
                expect(body).to.eq("Created");
                    });
                });

        it("verify delete status 201", () => {
            deleteBooking().then((response) => {
                expect(response.status).to.equal(201);
                    });
                });
            });
        });
    });
});
});
