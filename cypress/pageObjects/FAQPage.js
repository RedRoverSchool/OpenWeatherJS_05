class FAQPage {
    elements = {
        getTitle: () => cy.get('div.topic h1')
    }
}
export default FAQPage;