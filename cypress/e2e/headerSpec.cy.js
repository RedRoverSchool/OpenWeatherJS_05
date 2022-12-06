/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import FAQPage from "../pageObjects/FAQPage.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";
import BusinessPage from "../pageObjects/BusinessPage.js";
import MainPage from "../pageObjects/MainPage.js";
import BlogPage from "../pageObjects/BlogPage.js";
import TopicPage from "../pageObjects/TopicPage.js";
import DashboardPage from "../pageObjects/DashboardPage.js";
import SignInPage from "../pageObjects/SignInPage";

const guidePage = new GuidePage();
const header = new Header();
const faqPage = new FAQPage();
const howToStart = new HowToStartPage();
const businessPage = new BusinessPage();
const mainPage = new MainPage();
const blogPage = new BlogPage();
const topicPage = new TopicPage();
const dashboardPage = new DashboardPage();
const signInPage = new SignInPage();

describe('Header test suit', () => {

    beforeEach(function () {
        cy.fixture('url').then(url => {
            this.url = url;
        });
        
        cy.fixture('guidePage').then(text => {
            this.text = text;
        });
        
        cy.fixture('faqPage').then(faqData => {
            this.faqData = faqData;
        });
        cy.fixture('mapsPage').then(mapsData => {
            this.mapsData = mapsData
        });
        cy.fixture('howToStartPage').then(pageText => {
            this.pageText = pageText
        });
        cy.fixture('businessPage').then(data => {
            this.data = data;
        });
        cy.fixture('header').then(supportList => {
            this.supportList = supportList;
        });
        cy.fixture('mainPage').then(mainPageData => {
            this.mainPageData = mainPageData;
        });
        cy.fixture('mainPage').then(mainPage => {
            this.mainPage = mainPage;
        });
        cy.fixture('blogPage').then(blogPageData => {
            this.blogPageData = blogPageData;
        });
        cy.fixture('titles').then(titlesData => {
            this.titlesData = titlesData;
        });
        cy.fixture('dashboardPage').then(dashboardPageData => {
            this.dashboardPageData = dashboardPageData;
        });
        cy.fixture('signInPage').then(signIn  => {
            this.signIn = signIn;
        });
        cy.visit('/');
    });

    it('AT_008.006 | Main menu > Guide > Verify The text "Weather data in a fast and easy-to-use way" is displayed.', function () {
        header.clickGuideMenuLink();
        cy.url().should('be.equal', this.url.guidePage);
    
        guidePage.elements.getPageDescription().should('have.text', this.text.pageDescriptionText).and('be.visible')
    });

    it('AT_016.001 | Support > FAQ page > Verify Support button and FAQ link is clickable and redirects to the FAQ page', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        cy.url().should('eq', this.url.FAQPage);
        faqPage.elements.getTitle().should('have.text', this.faqData.h1Title);
    });

    it('AT_033.012 | Header > Navigation > Verify "Maps" menu link', function () {
        header.clickMapsMenuLink();
        cy.url().should('eq', this.url.mapsPageLink);
        cy.title().should('eq', this.mapsData.pageTitle);
    });

    it('AT_008.007 | Main menu > Guide > Verify user will be redirected to new url "/guide"', function () {
        header.clickGuideMenuLink();
        
        cy.url().should('be.equal', this.url.guidePage);
        guidePage.elements.getTitleGuide().should('have.text', this.text.h1Title);
    });

    it('AT_018.002 | Support > Dropdown menu > Verify "How to start" menu link', function() {
        header.clickSupportDropDownMenu();
        header.clickSupportHowToStartLink();

        cy.url().should('eq', this.url.howToStartPage);
        howToStart.elements.getTitle().should('have.text', this.pageText.headerTitle);
    });

    it('AT_038.001 | For business page > Verify that user can be redirected to the business page', function () {
        header.clickBusinessMenuLink()

        cy.url().should('eq', this.url.openWetherForBusiness)
        businessPage.elements.getH1Title().should('have.text', this.data.h1Title)
    });
    
    it('AT_018.009 | Header > Support > Verify Drop Down menu', function () {
        header.elements.getSupportDropDownMenuList().should('not.be.visible');
        header.clickSupportDropDownMenu();

        header.elements.getSupportDropDownMenuList().should('be.visible')
              .and('have.length', 3);        
        header.elements.getSupportDropDownMenuList().each(($el, idx) => {
            expect($el.text()).to.be.equal(this.supportList.supportDropdownList[idx]);
        });
    }); 
    
    it('AT_002.006 | Our Initiatives > Verifying the websites logo is clickable and redirects User to the Main page',function () {
        header.clickInitiativePage()
        header.clickLogoLink()
    
        cy.url().should('eq', this.url.mainPageLink)
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText)      
    });

    it('AT_060.002 | Header > Clicking the "Sign In" link > Verify the "Sign In" is visible and clickable', function () {
        header.elements.getSignInMenuLink()
        .should('be.visible')
        .and('have.text', this.supportList.signInOnHeader)
    });

    it('AT_002.010 | Header > Clicking the logo > Verify that the logo is clickable', function () {
        header.clickLogoLink();
    
        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText);
    });

    it('AT_034.001 | <Header > verify "For Business" button', function () {
        header.clickBusinessMenuLink()
        cy.url().should('eq', this.data.url)

        businessPage.elements.getH1Title()
            .should('have.text', this.data.h1Title)
    });
    
    it('AT_002.010 | Header > Clicking the logo > Verify that the logo is clickable', function () {
        header.clickLogoLink();
    
        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText);
    });

    it('AT_002.008 | Dashboard > Verifying the website"s logo is clickable and redirects User to the Main page', function () {
        header.clickDashboardMenu()
        header.clickLogoLink()
    
        cy.url().should('eq', this.url.mainPageLink)
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText)
    });

    it('AT_013.001 | Header > After clicking the Blog menu User is redirected to the Blog page', function () {
        header.clickBlogMenuLink();

        cy.url().should('be.equal', this.blogPageData.url);
        blogPage.elements.getWeatherFilter().should('have.text', this.blogPageData.weatherFilter);
    });

    it('AT_033.013 | Header > Navigation > Verify "Pricing" menu link', function () {
        header.clickPricingLink();
        cy.url().should('eq', this.url.pricingPage)
        topicPage.elements.getPageTitle().should('have.text', this.titlesData.pricingTitle);
    })    

    it('AT_002.002 | Header > Verifying the website logo is clickable and it redirects a User to the Main page', function () {
        header.clickGuideMenuLink();
        header.clickLogoLink();

        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.mainPageData.mainText)
     })

    it('AT_025.008 | Main menu > Dashboard > After clicking "Dashboard" item on bar menu User is redirected to Dashboard page', function () {
        header.clickDashboardMenu()

        cy.url().should('eq', this.url.dashboardPageLink)
        dashboardPage.elements.getWeatherDashboardTitle().should('have.text', this.dashboardPageData.h1Title)
    })
    it("AT_002.003 | Header > Verifying the website's logo is clickable and redirects User to the Main page", function () {
        header.clickMapsMenuLink();
        header.clickLogoLink();

        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getPageDescriptionWhiteText().should('have.text', this.mainPageData.pageDescriptionWhiteText);
    });

    it('AT_033.019 | Header > Navigation > Verify "Support" dropdown menu, FAQ', function () {
        header.elements.getMainMenuListLink().each(($el, ind) => {
          expect($el.text()).to.include(this.supportList.mainMenuList[ind])
        })
    
        header.clickSupportDropDownMenu()
        header.elements.getSupportDropDownMenuList().each(($el, ind) => {
          expect($el.text()).to.include(this.supportList.supportDropdownList[ind])
        })
    
        header.clickFAQMenuLink()
        cy.url().should('eq', this.url.FAQPage)
        faqPage.elements.getTitle().should('have.text', this.faqData.h1Title)
      })

    it('AT_008.003 | Main menu > Guide | Verifying the link on the page "Guide"', function () {
        header.elements.getGuideMenuLink().should('contain.text', this.text.h1Title);
        header.clickGuideMenuLink(); 

        cy.url().should('include', this.url.guidePage);
        guidePage.elements.getTitleGuide().should('be.visible');
    });

    it('AT_002.007 | Header > Verify the website logo is clickable and the user is redirected to the Main Page', function () {
        header.clickGuideMenuLink();
        header.clickLogoLink();

        cy.url().should('eq', this.url.mainPageLink);
        mainPage.elements.getMainPageContent().should('have.text', this.mainPage.mainText)
    });
    
    it('AT_039.002 | PersonalAccountName > Checking for options in account dropdown menu', function () {
        header.clickSignInMenuLink();
        signInPage.signIn(this.signIn.userProfile.email, this.signIn.userProfile.password);
        header.clickUserDropDownMenu();
        
        header.elements.getUserDropdownMenuList().find('a').each(($el, i) => {
          expect($el).to.be.visible
          expect($el.text()).to.include(this.supportList.userAccountHeaderDropdownMenu[i]);
        })
    });
    
    it('AT_008.006.02 | Main menu > Guide > Verify The text "OpenWeather products" is displayed.', function () {
        header.clickGuideMenuLink();

        cy.url().should('eq', this.url.guidePage)
        guidePage.elements.getOpenWeatherText().should('have.text', this.text.openWeatherText)
    })

});
