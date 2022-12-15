/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import BlogPage from "../pageObjects/BlogPage";
import BlogTeamAndCompany from "../pageObjects/BlogTeamAndCompanyPage";

const header = new Header();
const blogPage = new BlogPage();
const teamAndCompanyPage = new BlogTeamAndCompany();

describe('TeamAndCompany page in blog tests suite', () => {
    beforeEach(function() {
        cy.fixture('blogPage').then(blogPage => {
            this.blogPage = blogPage;
        })
        cy.visit('/');
    })

    it('AT_013.014 | Blog > Weather > TEAM&COMPANY > Verify that all posts on the page have "TEAM&COMPANY" category in description', function () {
        header.clickBlogMenuLink();

        blogPage.clickTeamAndCompanyLink();
        teamAndCompanyPage.elements.getPostInfoArray().each($el => {
            cy.wrap($el).should('include.text', this.blogPage.postCategoryNameArray[5]);
        })
    });
});