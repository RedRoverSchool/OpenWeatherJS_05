/// <reference types="cypress"/>

import Footer from "../pageObjects/Footer";
import AboutUs from "../pageObjects/AboutUsPage";
import ApiPage from "../pageObjects/ApiPage";
import SubscriptionsPage from "../pageObjects/SubscriptionsPage";
import MarketplacePage from "../pageObjects/MarketplacePage";
import Header from "../pageObjects/Header.js";
import SignInPage from "../pageObjects/SignInPage.js";

const footer = new Footer();
const aboutUs = new AboutUs();
const apiPage = new ApiPage();
const subscriptionsPage = new SubscriptionsPage();
const marketplacePage = new MarketplacePage();
const singInPage = new SignInPage();
const header = new Header();

describe('About Us', () => {

    beforeEach(function () {
        cy.fixture('url').then(url  => {
            this.url = url;
        });
        cy.fixture('signInPage').then(signIn  => {
            this.signIn = signIn;
        });
        cy.visit('/');
    })

    it('AT_028.006 | About us > Verify "Products Documentation" button redirects to API page', function() {
        footer.clickAboutUsLink();
        aboutUs.clickProductsDocumentationButton();

        cy.url().should('include', this.url.API);
        apiPage.elements.getWeatherApiTitle().should('be.visible');
    });

    it('AT_028.008 | About us > Verify "Buy by Subscription" button redirects to subscriptions page ', function()  {
        footer.clickAboutUsLink();
        aboutUs.clickBuyBySubscriptionButton();
            
        header.clickSignInMenuLink()
        singInPage.signIn(this.signIn.userProfileBugHunters.email, this.signIn.userProfileBugHunters.password);
        
        cy.url().should('be.equal', this.url.Subscriptions);
        subscriptionsPage.elements.getOneCallByCallSubscriptionPlan().should('be.visible');  
    });

    it('AT_028.009 | About us > Verify the button "Buy in the Marketplace" redirects to the Marketplace page', function() {
        footer.clickAboutUsLink();
        aboutUs.clickBuyMarketplaceButton();

        cy.url().should('include', this.url.MarketPage);
        marketplacePage.elements.getMarketplacePageTitle().should('be.visible')
    });

});