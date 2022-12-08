class MapsPage {
    elements = {
        getPressureLabel: () => cy.get('[for="Pressure"]'),
        getScaleName: () => cy.get('.scale-details > :first-child'),
        getCityName: () => cy.get('span.city-name.weather-average'),
        getCityData: () => cy.get('.expanded > :nth-child(1) > .city-data > .city-full-info > table > tbody'),
        getTemperatureLabel: () => cy.get('label[for=Temperature]'),
        getGlobalPrecipitationLabel: () => cy.get('label[for="Global Precipitation"]'),
        getScale: () => cy.get('.scale-details'),
        getWindSpeedLabel: () => cy.get('label[for="Wind speed"]')
    }
     
    clickPressureLabel() {
        this.elements.getPressureLabel().click({force: true});
    }

    clickCityName() {
        this.elements.getCityName().click();
    }

    clickGlobalPrecipitationLabel() {
        this.elements.getGlobalPrecipitationLabel().click();
    }

    clickWindSpeedLabel() {
        this.elements.getWindSpeedLabel().click();
    }
    
}
export default MapsPage;
