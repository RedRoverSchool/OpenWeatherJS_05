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
            cy.visit('/');
        })

        it('AT_017.004 | Support > How to start > Verify the newly opened page title is Technology', function () {
            header.clickSupportDropDownMenu()
            header.clickSupportHowToStartLink()
            howToStartPage.clickWhyOurFreeWeatherAPILink() 
            topicPage.elements.getPageTitle().should('have.text', this.title.technologyTitle);
          });
    })

    