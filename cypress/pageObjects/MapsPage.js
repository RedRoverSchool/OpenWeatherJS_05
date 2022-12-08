class MapsPage {
    elements = {
        getPressureLabel: () => cy.get('[for="Pressure"]'),
        getScaleName: () => cy.get('.scale-details > :first-child'),
        getCityName: () => cy.get('span.city-name.weather-average'),
        getCityData: () => cy.get('.expanded > :nth-child(1) > .city-data > .city-full-info > table > tbody'),
        getTemperatureLabel: () => cy.get('label[for=Temperature]'),
        getGlobalPrecipitationLabel: () => cy.get('label[for="Global Precipitation"]'),
        getScale: () => cy.get('.scale-details'), 
        getSearchIcon: () => cy.get('[class="leaflet-bar leaflet-control"] div'),
        getSearchInput: () => cy.get('[class="leaflet-bar leaflet-control"] input'),
        getRandomCity: () => cy.get('$("div:contains("^Chicago$")")')
       
        //div:nth-child(6) span:nth-child(2)
    }
     
    clickPressureLabel() {
        this.elements.getPressureLabel().click({force: true});
    }
}
export default MapsPage;
