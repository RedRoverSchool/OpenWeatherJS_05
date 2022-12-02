/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import BlogPage from "../pageObjects/BlogPage";
import BlogAgroPage from "../pageObjects/BlogAgroPage";

const header = new Header();
const blogPage = new BlogPage();
const blogAgroPage = new BlogAgroPage();

describe('AGRO page in blog test suite', () => {
    beforeEach(function () {
        cy.visit('/');
    })

    it('AT_013.011 | Blog > Weather > AGRO > Verify that all posts on the page have "agro" category in description', () => {
        header.clickBlogMenuLink();
    
        blogPage.clickAgroLink();
        blogAgroPage.elements.getPostInfoArray().each($el => {
            cy.wrap($el).should('include.text', 'AGRO');
        });   
    });    
});