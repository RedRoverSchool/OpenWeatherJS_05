class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenuLink: () => cy.get('#support-dropdown+ul [href$="/questions"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]'),
        getMarketplaceMenuLink: () => cy.get('#desktop-menu a[href*="marketplace"]'),
        getSignInMenuLink: () => cy.get('li[class="user-li"] a[href$="sign_in"]'),
        getUserDropDownMenu: () => cy.get('.inner-user-container'),
        getUserLogoutLink: () => cy.get('.dropdown-menu [href*="/sign_out"]'),
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
        
    clickSignInMenuLink() {
        this.elements.getSignInMenuLink().click({force: true});
    };

    clickUserDropDownMenu() {
        this.elements.getUserDropDownMenu().click({force: true});
    };

    clickUserLogoutLink() {
        this.elements.getUserLogoutLink().click({force: true});
    };

};
export default Header;
