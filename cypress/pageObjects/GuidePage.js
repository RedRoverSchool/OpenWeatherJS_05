class GuidePage {
    elements = {
        getTitleGuide: ()=> cy.get('h1.breadcrumb-title'),
        getPageDescription: ()=> cy.get('div.col-sm-12 h1'),
        getHomeMenuLink: ()=> cy.get('.breadcrumb.pull-right.hidden-xs li :nth-child(1)'),
        getSubscribeButton: ()=> cy.get('a[href="/price"].ow-btn.round.btn-orange'),
        getOpenWeatherText: ()=> cy.get('div.col-sm-12 > h2'),
        getProfessionalCollectionsText: ()=> cy.get('div.col-sm-12 h4 > b'),
        getDedicatedWeatherProductsText: () => cy.get('div.col-sm-12 > ol > :nth-child(14)'),
        getOpenWeatherNwnText: ()=> cy.get('div.col-sm-12 :nth-child(21)'),
        getHowToStartText: ()=> cy.get('div.col-sm-12 > ol > :nth-child(24)')
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