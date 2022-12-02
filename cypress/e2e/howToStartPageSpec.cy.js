/// <reference types="cypress" />


import Header from "../pageObjects/Header.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";




const header = new Header();
const howToStartPage = new HowToStartPage();

describe('How To Start Page', () => {
    
    beforeEach(function() {
        cy.fixture('howToStartPage').then(data  => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.visit('/');
    });

    it('AT_017.003 |How to start > Verify navigation to "API care recommendations" page', function () {
        //cy.get('#support-dropdown').click({ force: true })
        header.clickSupportDropDownMenu();
        header.clickSupportHowToStartLink();
       // cy.url.should('be.equal', this.howToStartPage)
       // cy.get('#support-dropdown-menu:nth-child(2) a[href ="/appid"]').click({ force: true })
        //cy.url().should('eq', 'https://openweathermap.org/appid')
        //cy.get('.breadcrumb-title').should('have.text', "How to start using professional collections")
        howToStartPage.elements.getTitle()
            .should('be.visible')
            .contains(this.data.headerTitle)
          
        howToStartPage.clickApiCareRecommendationsLink();
        cy.url().should('contain', this.data.urlIdApiCare)

        howToStartPage.elements.apiCareRecommendationsTitle()
            .should('be.visible')
            .contains(this.data.titleApiCare)
    
      });
})