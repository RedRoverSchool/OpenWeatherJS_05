class MapsPage {
    elements = {
        getPressureLabel: () => cy.get('[for="Pressure"]'),
        getScaleName: () => cy.get('.scale-details > :first-child'), 
        getSearchIcon: () => cy.get('[class="leaflet-bar leaflet-control"] div'),
        getSearchInput: () => cy.get('[class="leaflet-bar leaflet-control"] input'),
        getRandomCity: () => cy.get('$("div:contains("^Chicago$")")')
       
        //div:nth-child(6) span:nth-child(2)
    }
     
    clickPressureLabel() {
        this.elements.getPressureLabel().click({force: true});
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

    openCityInfoSection() {
        this.elements.getRandomCity().click()
        
    }
}
export default MapsPage;
