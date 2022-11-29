class GuidePage {
    elements = {
        getTitleGuide: ()=> cy.get('h1.breadcrumb-title'),
        getPageDescription: ()=> cy.get('div.col-sm-12 h1'),
        getHomeMenuLink: ()=> cy.get('.breadcrumb.pull-right.hidden-xs li :nth-child(1)'),
        getSubscribeButton: ()=> cy.get('a[href="/price"].ow-btn.round.btn-orange')
    };

    clickHomeMenuLink() {
        this.elements.getHomeMenuLink()
        .click({ force: true });
    };

    clickSubscribeButton(){
        this.elements.getSubscribeButton().click();
    }
}
export default GuidePage;