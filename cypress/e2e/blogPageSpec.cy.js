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
        header.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true});

        cy.url().should('be.equal', this.data.url);
        blogPage.elements.getWeatherFilter().should('have.text', this.data.weatherFilter);
    });

    it('AT_013.002 | Blog > Weather > After redirecting to the Blog page 10 posts are displayed on the first page', function () {
        header.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({force: true});

        blogPage.elements.getAllPosts().should('have.length', this.data.postsQuantity);
    });
});
