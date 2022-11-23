class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]')
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true})
    }
}
export default Header;
