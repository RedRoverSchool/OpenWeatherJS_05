class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getFAQMenuLink: () => cy.get('ul#support-dropdown-menu a[href="/faq"]')
    }
     
    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true})
    }

    clickSupportDropDownMenu() {
        this.elements.getSupportDropDownMenu().click({force: true})
    }

    clickFAQMenuLink() {
        this.elements.getFAQMenuLink().click({force: true})
    }
}
export default Header;
