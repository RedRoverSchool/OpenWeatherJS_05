class TopicPage {

    elements = {
    getHomePageButton: () => cy.get('.breadcrumb a[href="/"]')

    }

    clickHomePageButton() {
        this.elements.getHomePageButton().click({force: true});
    }
}
export default TopicPage;
