class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenuLink: () => cy.get('#support-dropdown+ul [href$="/questions"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]')

        getInitiativesPage: () => cy.get('#desktop-menu a[href="/our-initiatives"]'),
        getLogoLink: () => cy.get('li.logo a')
     };

    clickSupport() {
        this.elements.getSupportDropDownMenu().click({ force: true });
    };

    clickAskAquestionMenuLink() {
        this.elements.getAskAquestionMenuLink()
            .invoke('removeAttr', 'target')
            .click({ force: true });
    };

    clickPartnersMenuLink() {
        this.elements.getPartnersMenuLink().click({ force: true });
    };

    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickMapsMenuLink() {
        this.elements.getMapsMenuLink().click({ force: true });
    };

 clickInitiativesLink(){
        this.elements.getInitiativesPage().click({ force: true });
    };
    clickLogoLink(){
        this.elements.getLogoLink().click({ force: true });
    }
}
export default Header;
