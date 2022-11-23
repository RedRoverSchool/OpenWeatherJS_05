class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]')
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true});
    }

    clickMapsMenuLink() {
        this.elements.getMapsMenuLink().click({force: true});
    }
}
export default Header;
