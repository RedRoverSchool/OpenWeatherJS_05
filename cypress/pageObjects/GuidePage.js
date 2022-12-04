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
        getHowToStartText: ()=> cy.get('div.col-sm-12 > ol > :nth-child(24)'),
        getFirstLearnMoreButton: ()=> cy.get('ol [href="/api#current"]'),
        getSecondButtonLearnMore: ()=> cy.get('ol [href="/api#history"]'),
        getSubHeaders2Level: ()=> cy.get('main h2'),
        getSubHeaders4Level: ()=> cy.get('h4 b')        
    };

    clickHomeMenuLink() {
        this.elements.getHomeMenuLink()
        .click({ force: true });
    };

    clickSubscribeButton(){
        this.elements.getSubscribeButton().click();
    };

    clickFirstLearnMoreButton() {
        this.elements.getFirstLearnMoreButton().click();
    };

    clickLearnMoreSecondButton(){
        this.elements.getSecondButtonLearnMore().click({force: true});
    }
}
export default GuidePage;