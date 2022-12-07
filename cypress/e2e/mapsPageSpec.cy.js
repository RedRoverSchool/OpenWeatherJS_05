/// <reference types="cypress" />

import Header from "../pageObjects/Header.js"
import MapsPage from "../pageObjects/MapsPage.js"
 
const header = new Header();
const mapsPage = new MapsPage();
 
describe('Maps page test suite', () => {

    beforeEach(function() {
        cy.fixture('mapsPage').then(data => {
            this.data = data;
        });
        cy.fixture('url').then(url => {
            this.url = url
        });
        cy.visit('/');
    });
 
    it('AT_027.004 | Maps > Section with the scale > The scale\'s name matches the label\'s name after selecting "Pressure"', function () {
        header.clickMapsMenuLink();
        mapsPage.clickPressureLabel();

        mapsPage.elements.getScaleName().should('contain.text', this.data.pressureScaleName);
    });

    it('AT_027.003 |Maps > Section "weather control" > scale-details changes when switching data to Pressure', function () {
        header.clickMapsMenuLink()
        cy.url().should("include", this.url.mapsPage)
        mapsPage.clickPressureLabel()
    
        mapsPage.elements.getScaleName().should('contain', this.data.pressureScaleNameFull)
    });

    it.only('AT_026.002 | Maps > Visualization of data on the map Verify that user can Click on any city on the map and see the data', function () {
        header.clickMapsMenuLink()
        cy.url().should('include', 'weathermap')
        mapsPage.elements.getSearchIcon().should('be.visible')
        mapsPage.clickOnSearchIcon()
        mapsPage.typeSearchWord('Chicago, Illinois')
        mapsPage.sibmitSearch()
        cy.wait(1000)
        cy.contains('div:nth-child(2) span:nth-child(2)', 'Chicago').click()

        cy.get('thead > tr .city-param:visible').should('have.text', 'Chicago')
        cy.get('tbody tr:nth-child(1) .city-param:visible').should('have.text', 'US')
        cy.get('tbody tr:nth-child(2) .city-param:visible')
            .should('contain', 'ºC')
            .invoke('text')
            .then(showNumberValues)  
            .should('match', /[-.0-9]+/)
        cy.get('tbody > tr:nth-child(3) .city-param:visible')
            .should('contain', '%')
            .invoke('text')
            .then(showNumberValues)  
            .should('match',/[.0-9]+/)

        cy.get('tbody > tr:nth-child(4) .city-param:visible')
            .should('contain', '%')
            .invoke('text')
            .then(showNumberValues)  
            .should('match',/[.0-9]+/)

        cy.get('tbody > tr:nth-child(5) .city-param:visible')
            .should('contain', 'hPa')
            .invoke('text')
            .then(showNumberValues)  
            .should('match',/[.0-9]+/)
        
        cy.get('tbody > tr:nth-child(6) .city-param:visible')
            .should('contain', '°')
            .invoke('text')
            .then(showNumberValues)  
            .should('match',/[.0-9]+/)   

        cy.get('tbody > tr:nth-child(7) .city-param:visible')
            .should('contain', 'm/s')
            .invoke('text')
            .then(showNumberValues)  
            .should('match',/[.0-9]+/)   

        function showNumberValues(char) {
            return char.replace(/[^0-9.]+/g,'');
        }
               

        // function formatString(celcium) {
        //     return celcium.replace('ºC', ''); 
                
        // }

        // function formatString1(percent) {
        //     return percent.replace('%', ''); 
        // }

        // function formatString2(hectoPascal) {
        //     return hectoPascal.replace('hPa', ''); 
        // }

        // function formatString2(hectoPascal) {
        //     return hectoPascal.replace('hPa', ''); 
        // }

      
        // cy.get('.city-full-info')
        // .then($els => {
//   // get Window reference from element
//         const win = $els[0].ownerDocument.defaultView
//   // use getComputedStyle to read the pseudo selector
//         const before = win.getComputedStyle($els[0], 'before')
//   // read the value of the `content` CSS property
//         const contentValue = before.getPropertyValue('tbody tr:nth-child(1) .city-param')
//   // the returned value will have double quotes around it, but this is correct
//         expect(contentValue).to.contain('US')
//         })
        // cy.contains('thead', 'Chicago').find('div:nth-child(1) tbody tr:nth-child(1) .city-param').parents('table')
        // cy.get('table tr:nth-child(1) .city-param-name')
        // .should('have.text', 'US')

        // const $div = Cypress.$('div:contains("^Chicago$")')
        // cy.wrap($div)
        //     .should('not.have.class', 'active')
        //     .click()

        // cy.get('div')
        // .find('div').each(($el) => {
        //     // extract text with text() method
        //     const txt = $el.find('a').text();
        //     if ( txt.includes('Chicago')){
        //        el.click();
        //     }
        //  })

    })
});
         //     .then(html => {
         //       const $titleHomePage = Cypress.$(html).find('div:contains("^Chicago$")'.text()
    //     })
    // })
        // cy.get('div:nth-child(18) span:nth-child(2)').click({force: true})
        // cy.get('div:nth-child(18) table').should('be.visible')
        
        // cy.get('div:nth-child(18) tbody tr:nth-child(1) .city-param').should('have.text', 'US')
        // cy.get('div:nth-child(18) tbody tr:nth-child(2) .city-param-name').should('have.text', 'temp')
        // cy.get('div:nth-child(18) tbody tr:nth-child(2) .city-param')
            // .invoke('text')
            // .then(formatString)  
            // .should('match', /[-.0-9]+/)
            // .should('contain', 'ºC')

          
        // cy.get('.leaflet-marker-pane').find('div').then(function(e) {
        //     const t = e.text()
        //     expect(t).to.contains('Chicago')

        // })


        
        // const e = $("div:contains('^Chicago$')") 
        // if (e.length > 0){
        //     console.log(e.text())
        //  }
    //       let city = $("div:contains('^Chicago$')")
    //         function clickCity(city) {
    //         if (city.length > 0){
    //             console.log(city.text())
    //     }
    // }

        // cy.get('h1#headingText').find('span').then(function(e){
        //     //method text to obtain text content
        //     const t = e.text()
        //     expect(t).to.contains('Sign')
        //  })
    // mapsPage.openCityInfoSection()      