class MainProductPage {
  elements = {
    getTitle: () => cy.get('#main_products .section h2')
  }
}
export default MainProductPage;
