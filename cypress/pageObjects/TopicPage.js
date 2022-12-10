class TopicPage {

    elements = {
    getHomePageButton: () => cy.get('.breadcrumb a[href="/"]'),
    getPageTitle: () => cy.get('.breadcrumb-title'),
    getHeadlineGuide: () => cy.get('.breadcrumb-title')
    }

    clickHomePageButton() {
        this.elements.getHomePageButton().click({force: true});
    }
}
export default TopicPage;
