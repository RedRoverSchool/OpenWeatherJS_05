class MainAboutUsPage {
  elements = {
    getAboutUsButton: () => cy.get('a[href="#main_about"]'),
    getTitle: () => cy.get('h2[style="margin-top: 0;"]')
  }

  clickAboutUsButton(){
    this.elements.getAboutUsButton().click({force: true});
  }
}
export default MainAboutUsPage;