class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getSupportDropDown: () => cy.get('#support-dropdown'),
        getAskAquestion: () => cy.get('#support-dropdown+ul [href$="/questions"]')
    }

    clickSupport() {
        cy.get('#support-dropdown').click({force: true});
    };
    
    clickAskAquestion() {
        cy.get('#support-dropdown+ul [href$="/questions"]')
        .invoke('removeAttr', 'target')
        .click({force: true});
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true})
    }
}
export default Header;
