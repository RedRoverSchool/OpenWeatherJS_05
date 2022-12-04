/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import BlogPage from "../pageObjects/BlogPage";
import BlogTechnologiesPage from "../pageObjects/BlogTachnologiesPage";

const header = new Header();
const blogPage = new BlogPage();
const blogTechnologies = new BlogTechnologiesPage();

describe('Technologies page in blog test suite', () => {
    beforeEach(function() {
        cy.fixture('blogPage').then(blogPage => {
            this.blogPage = blogPage;
        })
        cy.visit('/');
    })

    it('AT_013.013 | Blog > Weather > TECHNOLOGIES > Verify that all posts on the page have "technologies" category in description', function() {
        header.clickBlogMenuLink();

        blogPage.clickTechnologiesLink();

        blogTechnologies.elements.getPostInfoArray().each($el => {
            cy.wrap($el).should('contain', this.blogPage.postCategoryNameArray[4]);
        });        
    });
});