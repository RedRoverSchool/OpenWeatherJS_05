class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a'),
        getAllPosts: () => cy.get('.post-list .post'),
        getFirstPostsLink: () => cy.get('.post-list .post:nth-child(1) .post__title-link'),
        getPostsImage: () => cy.get('.post-page__img')
    }
     
    clickFirstPostsLink() {
        this.elements.getFirstPostsLink().click({force: true})
    }
}
export default BlogPage;
