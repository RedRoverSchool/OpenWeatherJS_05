class GuidePage {
    elements = {
        getTitleGuide: ()=> cy.get('h1.breadcrumb-title'),
        getPageDescription: ()=> cy.get('div.col-sm-12 h1'),
        getHomeMenuLink: ()=> cy.get('.breadcrumb.pull-right.hidden-xs li :nth-child(1)')
    };

    clickHomeMenuLink() {
        this.elements.getHomeMenuLink()
        .click({ force: true });
    };
}
export default GuidePage;