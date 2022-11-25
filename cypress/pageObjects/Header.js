class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenuLink: () => cy.get('#support-dropdown+ul [href$="/questions"]'),
        getFAQMenuLink: () => cy.get('ul#support-dropdown-menu a[href="/faq"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]'),
        getMarketplaceMenuLink: () => cy.get('#desktop-menu a[href*="marketplace"]'),
        getLogoLink: () => cy.get('li.logo a'),
        getInitiativesPage: () => cy.get('#desktop-menu a[href="/our-initiatives"]'),
        getApiMenuLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getBusinessMenuLink: () => cy.get('#desktop-menu :nth-child(10) > a'),
        getGuideMenuLink: () => cy.get('#desktop-menu a[href="/guide"]'),
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

    clickLogoLink() {
        this.elements.getLogoLink().click({force : true})
    };

    clickInitiativePage() {
        this.elements.getInitiativesPage().click({force : true})
    };

    clickApiMenuLink() {
        this.elements.getApiMenuLink().click({force : true})
    }

    clickBusinessMenuLink(){
        this.elements.getBusinessMenuLink()
        .invoke('removeAttr', 'target')
        .click({ force: true });
    }
    clickGuideMenuLink(){
        this.elements.getGuideMenuLink().click({ force: true });
    }
};
export default Header;
