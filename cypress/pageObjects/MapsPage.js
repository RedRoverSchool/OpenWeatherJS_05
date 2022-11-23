class MapsPage {
    elements = {
        getPressureLabel: () => cy.get('[for="Pressure"]'),
        getScaleName: () => cy.get('.scale-details > :first-child')
    }
     
    clickPressureLabel() {
        this.elements.getPressureLabel().click({force: true});
    }
}
export default MapsPage;
