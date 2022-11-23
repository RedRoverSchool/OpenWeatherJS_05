class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a')
    }
}
export default BlogPage;
