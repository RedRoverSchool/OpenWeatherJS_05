//<reference types="cypress"/>

const API_BASE_URL =  Cypress.env('apiBaseUrl')
let CREATED_ID
describe("API with Cypress", () => {

	describe("Create Booking", () => {

		const createBookingRequest = () => 
			cy.request({
				method: "POST",
				url: `${API_BASE_URL}/booking`,
				headers: {"Content-Type": "application/json"},
				body: {
					"firstname" : "Anna",
					"lastname" : "Browny",
					"totalprice" : 444,
					"depositpaid" : true,
					"bookingdates" : {
						"checkin" : "2018-01-01",
						"checkout" : "2022-01-01"
					},
					"additionalneeds" : "Breakfast" 
				}
			})
			
		it('verify response status',()=> {
			createBookingRequest()
			.then(response => {
				console.log(response.body)
				expect(response.status).to.equal(200)
			})
		})	
					
		it('verify that booking created',() => {
			createBookingRequest()
			.its('body')
			.then(response => {
                expect(response.booking.lastname).to.equal('Browny')
                expect(response.booking.firstname).to.equal('Anna')
				expect(response).to.have.any.keys('bookingid')
				CREATED_ID = response.bookingid
				console.log('CREATED_ID= ', CREATED_ID)
			})
		})
    })
})