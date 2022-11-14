/// <reference types = "cypress" />


///cy.visit('https://openweathermap.org/')

describe('ark group', () => {

    it('AT_033.005 | Header > Navigation > Guide',() => {
    cy.visit('https://openweathermap.org/')
    cy.get('div#desktop-menu a[href*="/guide"]').invoke('removeAttr', 'target').click()
    cy.url().should('include','/guide')
   
    } ) 
     })
         
        
        it('AT_033.009 | Header > Navigation > Verify “API” menu link', () => {
            cy.visit('https://openweathermap.org/');
            cy.get('div#desktop-menu a[href*="/api"]').click();
            cy.url().should('eq', 'https://openweathermap.org/api');
        });
    
    



    


     