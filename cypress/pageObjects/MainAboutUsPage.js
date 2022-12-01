class MainAboutUsPage {
  elements = {
    getAboutUsButton: () => cy.get('a[href="#main_about"]'),
    getTitle: () => cy.get('h2[style="margin-top: 0;"]'),
    getOurPtoductButton: () => cy.get('[href="#main_products"]')
  }

  clickAboutUsButton(){
    this.elements.getAboutUsButton().click({force: true});
  }
  clickOurProductButton() {
    this.elements.getOurPtoductButton().click({force: true});
  }
}
export default MainAboutUsPage;