class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenuLink: () => cy.get('#support-dropdown+ul [href$="/questions"]'),
        getFAQMenuLink: () => cy.get('ul#support-dropdown-menu a[href="/faq"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]'),
        getMarketplaceMenuLink: () => cy.get('#desktop-menu a[href*="marketplace"]')
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

    clickMarketplaceMenuLink() {
        this.elements.getMarketplaceMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickSupportDropDownMenu() {
        this.elements.getSupportDropDownMenu().click({force: true})
    };

    clickFAQMenuLink() {
        this.elements.getFAQMenuLink().click({force: true})
    };
};
export default Header;
