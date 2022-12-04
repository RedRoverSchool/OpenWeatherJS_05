class BlogPlatformPage {
    elements = {
        getPostInfoArray: () => cy.get('div.post__info'),
    }
}
export default BlogPlatformPage;