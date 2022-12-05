/// <reference types="cypress" />

import Header from "../pageObjects/Header.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";
import TopicPage from "../pageObjects/TopicPage.js";

const header = new Header();
const howToStartPage = new HowToStartPage();
const topicPage = new TopicPage();

    describe('How to start', () => {

        beforeEach(function () {
            cy.fixture('titles').then(title => {
                this.title = title;
            });
            cy.fixture('howToStartPage').then(data  => {
                this.data = data;
            });
            cy.fixture('url').then(url => {
                this.url = url
            });
            cy.visit('/');
        })

        it('AT_017.004 | Support > How to start > Verify the newly opened page title is Technology', function () {
            header.clickSupportDropDownMenu()
            header.clickSupportHowToStartLink()
            howToStartPage.clickWhyOurFreeWeatherAPILink() 
            topicPage.elements.getPageTitle().should('have.text', this.title.technologyTitle);
        });

        it('AT_017.003 |How to start > Verify navigation to "API care recommendations" page', function () {
            header.clickSupportDropDownMenu();
            header.clickSupportHowToStartLink();

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

    