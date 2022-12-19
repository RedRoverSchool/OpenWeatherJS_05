class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a'),
        getAllPosts: () => cy.get('.post-list .post'),
        getFirstPostsLink: () => cy.get('.post-list .post:nth-child(1) .post__title-link'),
        getPostsImage: () => cy.get('.post-page__img'),
        getAllPostsLinks: () => cy.get('.post-list .post .post__title-link'),
        getAgroLink: () => cy.get('a[href="/blog/category/agro"]'),
        getPlatformLink: () => cy.get('a[href="/blog/category/platform"]'),
        getTechnologiesLink: () => cy.get('a[href="/blog/category/technologies"]'),
        getTeamAndCompanyLink: () => cy.get('a[href="/blog/category/teamandcompany"]'),
    }

    clickFirstPostsLink() {
        this.elements.getFirstPostsLink().click({ force: true })
    }

    clickAgroLink() {
        this.elements.getAgroLink().click();
    }

    clickPlatformLink() {
        this.elements.getPlatformLink().click();
    }

    clickTechnologiesLink() {
        this.elements.getTechnologiesLink().click();
    }

    clickTeamAndCompanyLink() {
        this.elements.getTeamAndCompanyLink().click();
    }

    clickAndRedirectingAllPosts(url, textOnPage) {
        this.elements.getAllPostsLinks().each((el, i) => {
            this.elements.getAllPostsLinks().eq(i).click();
            cy.url().should('include', url[i]);
            cy.get('h1').should('have.text', textOnPage[i]);
            cy.go(-1);
        });
    }
}
export default BlogPage;