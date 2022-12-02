/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import BlogPage from "../pageObjects/BlogPage";
import BlogPlatformPage from "../pageObjects/BlogPlatformPage";

const header =  new Header();
const blogPage = new BlogPage();
const platformPage = new BlogPlatformPage();

describe('Platform page in blog test suite', () => {
    beforeEach(function () {
        cy.fixture('blogPage').then(blogPage => {
            this.blogPage = blogPage;
        }); 

        cy.visit('/');
    });

    it('AT_013.012 | Blog > Weather > PLATFORM> Verify that all posts on the page have "platform" category in description', function() {
        header.clickBlogMenuLink();

        blogPage.clickPlatformLink();
        platformPage.elements.getPostInfoArray().each($el => {
            cy.wrap($el).should('include.text', this.blogPage.postCategoryNameArray[3]);
        });
    });    
});