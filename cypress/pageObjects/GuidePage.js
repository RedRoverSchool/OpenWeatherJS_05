class GuidePage {
    elements = {
        getTitleGuide: ()=> cy.get('h1.breadcrumb-title'),
        getHomeMenuLink: ()=> cy.get('.breadcrumb.pull-right.hidden-xs li :nth-child(1)')
    };

    clickHomeMenuLink() {
        this.elements.getHomeMenuLink()
        .click({ force: true });
    };
}
export default GuidePage;