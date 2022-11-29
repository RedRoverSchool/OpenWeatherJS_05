/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import MainPage from "../pageObjects/MainPage.js";
import OurInitiativesPage from "../pageObjects/OurInitiativesPage.js";
import StudentInitiativePage from "../pageObjects/StudentInitiativePage.js";

const header = new Header();
const mainPage = new MainPage();
const ourInitiative = new OurInitiativesPage();
const studentInititative = new StudentInitiativePage();

describe('our_initiatives', () => {
    
    beforeEach(function () {
        cy.fixture('mainPage').then(data => {
            this.data = data;
        });
        cy.fixture('bugHunters').then(data => {
                this.bugHunters = data;
            });
        cy.visit('/');

    })

    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page',function () {
        header.clickInitiativePage()
        header.clickLogoLink()

        mainPage.elements.getMainPageContent().should('have.text', this.data.mainText)      
    });

    it('AT_046.002|Click on the link “Learn more” should take user to the new page',function () {
            
            header.elements.getInitiativesPage().should('have.text', this.bugHunters.mainMenu[6]);
            header.clickInitiativePage();
            cy.url().should('be.equal', this.bugHunters.urlOur);
            ourInitiative.elements.getOurInitiativesTitle().should('have.text', this.bugHunters.titleOurInitiative);

            ourInitiative.elements.getEducationTitle().should('have.text', this.bugHunters.titleEducation);
            ourInitiative.elements.getLearnMoreLink().should('have.text', this.bugHunters.learnMoreLink);
            ourInitiative.clickLearnMoreLink();

            cy.url().should('be.equal', this.bugHunters.urlStudent);
            studentInititative.elements.getStudentInitiativeTitle().should('have.text', this.bugHunters.titleStudentInitiative);
    });
})