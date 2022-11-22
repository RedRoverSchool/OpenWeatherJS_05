class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a'),
        getAllPosts: () => cy.get('.post-list .post')
    }
}
export default BlogPage;
