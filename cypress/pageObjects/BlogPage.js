class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a'),
        getAllPosts: () => cy.get('.post-list .post'),
        getFirstPostsLink: () => cy.get('.post-list .post:nth-child(1) .post__title-link'),
        getPostsImage: () => cy.get('.post-page__img'),
        getAllPostsLinks: () => cy.get('.post-list .post .post__title-link'),
        getAgroLink: () => cy.get('a[href="/blog/category/agro"]'),
        getPlatformLink: () => cy.get('a[href="/blog/category/platform"]'),
    }
     
    clickFirstPostsLink() {
        this.elements.getFirstPostsLink().click({force: true})
    }

    clickAgroLink() {
        this.elements.getAgroLink().click();
    }

    clickPlatformLink() {
        this.elements.getPlatformLink().click();
    }
}
export default BlogPage;