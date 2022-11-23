class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenu: () => cy.get('#support-dropdown+ul [href$="/questions"]')
    }

    clickSupport() {
        this.elements.getSupportDropDownMenugetSupportDropDownMenu().click({force: true});
    };
    
    clickAskAquestion() {
        this.elements.getAskAquestionMenu
        .invoke('removeAttr', 'target')
        .click({force: true});
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true})
    }

    clickPartnersMenuLink() {
        this.elements.getPartnersMenuLink().click({force: true});
    }
}
export default Header;
