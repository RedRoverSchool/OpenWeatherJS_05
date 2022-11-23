class MainPage {
    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button')
    }

    clickSearchBtn() {
        this.elements.getSearchBtn().click({force: true});
    }

    setSearchInputText(inputText) {
        this.elements
            .getSearchInput()
            .clear({force: true})
            .type(inputText, {force: true});
    }
}
export default MainPage;