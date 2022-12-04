/// <reference types="cypress" />
 
import Header from "../pageObjects/Header.js"
import OurInitiativesPage from "../pageObjects/OurInitiativesPage.js";
import StudentInitiativePage from "../pageObjects/StudentInitiativePage.js";

const header = new Header();
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
        cy.fixture('url').then(data => {
            this.url = data;
        });
        cy.fixture('titles').then(data => {
            this.titles = data;
        })
        cy.visit('/');

    })

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

    it('AT_046.004 | Main page > Our initiatives > button "Learn more" > page has text Student initiative', function(){
        header.clickInitiativePage();
        ourInitiative.clickLearnMoreButton();
        
        cy.url().should('include', this.url.studentInitiativeUrl);
        studentInititative.elements.getStudentInitiativeTitle()
            .should('have.text', this.titles.studentInitiativeTitle);
    });
    
})