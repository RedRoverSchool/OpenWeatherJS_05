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
        getScale: () => cy.get('.scale-details'), 
        getSearchIcon: () => cy.get('[class="leaflet-bar leaflet-control"] div'),
        getSearchInput: () => cy.get('[class="leaflet-bar leaflet-control"] input'),
        getNameOfCity: () => cy.get('span.city-name'),
        getTableHeader: () => cy.get('thead > tr .city-param:visible'),
        getTableCountryValue: () => cy.get('tbody tr:nth-child(1) .city-param:visible'),
        getTableTempValue: () => cy.get('tbody tr:nth-child(2) .city-param:visible'),
        getTableCloudsValue: () => cy.get('tbody tr:nth-child(3) .city-param:visible'),
        getTableHumidityValue: () => cy.get('tbody tr:nth-child(4) .city-param:visible'),
        getTablePressureValue: () => cy.get('tbody tr:nth-child(5) .city-param:visible'),
        getTableWindDirectionValue: () => cy.get('tbody tr:nth-child(6) .city-param:visible'),
        getTableWindeSpeedValue: () => cy.get('tbody tr:nth-child(7) .city-param:visible')
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
    
        clickOnSearchIcon() {
        this.elements.getSearchIcon().click();
    }

    typeSearchWord(cityName) {
        this.elements.getSearchInput().type(cityName)
    }

    sibmitSearch() {
        this.elements.getSearchInput().type('{enter}')
    }
}
export default MapsPage;
