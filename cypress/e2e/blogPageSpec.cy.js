/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import BlogPage from "../pageObjects/BlogPage.js"
 
const header = new Header();
const blogPage = new BlogPage();
 
describe('Blog page test suite', () => {

    beforeEach(function() {
        cy.fixture('blogPage').then(data => {
            this.data = data;
        });
        cy.visit('/');
    });
 
    it('AT_013.001 | Blog > Weather > After clicking the Blog menu User is redirected to the Blog page', function () {
        header.clickBlogMenuLink();

        cy.url().should('be.equal', this.data.url);
        blogPage.elements.getWeatherFilter().should('have.text', this.data.weatherFilter);
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
});
