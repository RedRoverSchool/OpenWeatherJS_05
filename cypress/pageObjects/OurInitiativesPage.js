class OurInitiativesPage {
    elements = {

        getOurInitiativesTitle: () => cy.get('h1 .orange-text'),
        getEducationTitle: () => cy.get('.col-sm-12 :nth-child(9) h2>span'),
        getLearnMoreLink: () => cy.get('[href="/our-initiatives/student-initiative"]')
    }

    clickLearnMoreLink() {
        this.elements.getLearnMoreLink().click();
    }
}

export default OurInitiativesPage;
