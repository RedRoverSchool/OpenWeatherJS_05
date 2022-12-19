/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import BlogPage from "../pageObjects/BlogPage.js"

const header = new Header();
const blogPage = new BlogPage();

describe('Blog page test suite', () => {

    beforeEach(function () {
        cy.fixture('blogPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });

    it('AT_013.002 | Blog > Weather > After redirecting to the Blog page 10 posts are displayed on the first page', function () {
        header.clickBlogMenuLink();

        blogPage.elements.getAllPosts().should('have.length', this.data.postsQuantity);
    });

    it('AT_013.003 | Blog > Weather > Verifying the first post\'s link is clickable and redirects User to the post on a new page', function () {
        header.clickBlogMenuLink();
        blogPage.clickFirstPostsLink();

        cy.url().should('include', this.data.postsLink);
        blogPage.elements.getPostsImage().should('be.visible');
    });

    it('AT_013.007 | Blog > Weather > Verify that after landing on the Blog page 10 posts displayed on the first page', function () {
        header.clickBlogMenuLink();

        blogPage.elements.getAllPosts().should('have.length', this.data.postsQuantity);
    });

    it('AT_013.009 | Blog > Weather > All posts links are clickable and redirect a user to the posts in a new page', function () {
        header.clickBlogMenuLink();

            blogPage.clickAndRedirectingAllPosts(this.data.urlPostsWeather, this.data.weatherPostsTextOnNewpPage);
    });

    it('AT_013.006 | Blog > Weather > Verify that after clicking the Blog menu a user is redirected to the blog page', function () {
        header.clickBlogMenuLink();
        
        blogPage.elements.getWeatherFilter().should('have.text', this.data.weatherFilter);
    });

    it('AT_013.010 | Blog > Weather  10 posts are displayed on the first page', function () {
        header.clickBlogMenuLink();

        cy.url().should('eq', this.data.url);
        blogPage.elements.getAllPosts()
          .should('have.length', 10)
          .each(($el)=>{
            cy.wrap($el).should('be.visible')
          })
      });
});
