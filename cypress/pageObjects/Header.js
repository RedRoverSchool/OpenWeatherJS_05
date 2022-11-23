class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]')
    }
}
export default Header;
