class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]')
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true})
    }
}
export default Header;
