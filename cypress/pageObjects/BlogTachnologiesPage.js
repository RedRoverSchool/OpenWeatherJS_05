class BlogTechnologiesPage {
    elements = {
        getPostInfoArray: () => cy.get('div.post__info'),
    }
}
export default BlogTechnologiesPage;