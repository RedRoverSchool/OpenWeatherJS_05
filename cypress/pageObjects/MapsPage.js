class MapsPage {
    elements = {
        getPressureLabel: () => cy.get('[for="Pressure"]'),
        getScaleName: () => cy.get('.scale-details > :first-child'),
        getCityName: () => cy.get('span.city-name.weather-average'),
        getCityData: () => cy.get('.expanded > :nth-child(1) > .city-data > .city-full-info > table > tbody')
    }
     
    clickPressureLabel() {
        this.elements.getPressureLabel().click({force: true});
    }

    clickCityName() {
        this.elements.getCityName().click();
    }
}
export default MapsPage;
