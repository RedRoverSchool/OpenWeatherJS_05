class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getPartnersMenuLink: () => cy.get('#desktop-menu a[href="/examples"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getAskAquestionMenuLink: () => cy.get('#support-dropdown+ul [href$="/questions"]'),
        getFAQMenuLink: () => cy.get('ul#support-dropdown-menu a[href="/faq"]'),
        getMapsMenuLink: () => cy.get('#desktop-menu [href="/weathermap"]'),
        getMarketplaceMenuLink: () => cy.get('#desktop-menu a[href*="marketplace"]'),
        getLogoLink: () => cy.get('li.logo a'),
        getInitiativesPage: () => cy.get('#desktop-menu a[href="/our-initiatives"]'),
        getApiMenuLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getBusinessMenuLink: () => cy.get('#desktop-menu :nth-child(10) > a'),
        getUserDropDownMenu: () => cy.get('#user-dropdown'),
        getMyApiKeysLink: () => cy.get('#user-dropdown-menu a[href*=api_keys]'),
        getGuideMenuLink: () => cy.get('#desktop-menu a[href="/guide"]'),
        getDashboardMenuLink: () => cy.get('#desktop-menu [href$=-dashboard]'),
        getSignInMenuLink: () => cy.get('li[class="user-li"] a[href$="sign_in"]'),
        getDashboardMenuLink: () => cy.get('#desktop-menu [href$=-dashboard]'),
        getUserMyServicesLink: () => cy.get('#user-dropdown-menu > :nth-child(1) > a'),
        getUserLogoutLink: () => cy.get('.dropdown-menu [href*="/sign_out"]'),
        getUserDropDownMyApiLink: () => cy.get('#user-dropdown-menu [href$="/api_keys"]'),
        getPaymentMenuLink: () => cy.get('.dropdown-menu a[href="/payments"]'),
        getSupportHowToStartLink: () => cy.get('#support-dropdown-menu a[href ="/appid"]'),
        getSupportDropDownMenuList: () => cy.get('#support-dropdown-menu li'),
        getUserDropdownMenuList: () => cy.get('#user-dropdown-menu li'),
        getUserDropDownAllMenuVisible: () => cy.get('#user-dropdown-menu'),
        getUserDropDownMyProfileLink: () => cy.get('.dropdown-menu a[href*="/home"]'),
        getPricingLink: () => cy.get('#desktop-menu a[href="/price"]'),
        getMainMenuListLink: () => cy.get('#desktop-menu > ul')
    };

    clickSupportDropDownMenu() {
        this.elements.getSupportDropDownMenu().click({ force: true });
    };

    clickAskAquestionMenuLink() {
        this.elements.getAskAquestionMenuLink()
            .invoke('removeAttr', 'target')
            .click({ force: true });
    };

    clickPartnersMenuLink() {
        this.elements.getPartnersMenuLink().click({ force: true });
    };

    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickMapsMenuLink() {
        this.elements.getMapsMenuLink().click({ force: true });
    };

    clickMarketplaceMenuLink() {
        this.elements.getMarketplaceMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickSupportDropDownMenu() {
        this.elements.getSupportDropDownMenu().click({force: true})
    };

    clickFAQMenuLink() {
        this.elements.getFAQMenuLink().click({force: true})
    };

    clickLogoLink() {
        this.elements.getLogoLink().click({force : true})
    };

    clickInitiativePage() {
        this.elements.getInitiativesPage().click({force : true})
    };

    clickApiMenuLink() {
        this.elements.getApiMenuLink().click({force : true})
    };

    clickBusinessMenuLink() {
        this.elements.getBusinessMenuLink()
        .invoke('removeAttr', 'target')
        .click({ force: true });
    };

    clickGuideMenuLink() {
        this.elements.getGuideMenuLink().click({ force: true });
    }

    clickDashboardMenu() {
        this.elements.getDashboardMenuLink().invoke('removeAttr', 'target').click({force: true});
    }

    clickSignInMenuLink() {
        this.elements.getSignInMenuLink().click({force : true})
    };

    
    clickUserLogoutLink() {
        this.elements.getUserLogoutLink().click({force : true})
    };

    clickUserMyServicesLink() {
        this.elements.getUserMyServicesLink().click({force : true})

    };
    
    clickUserDropDownMenu() {
        this.elements.getUserDropDownMenu().click({force:true})
    }

    clickMyApiKyesLink() {
        this.elements.getMyApiKeysLink().click()
    }


    clickUserDropDownMyApiKeysLink() {
        this.elements.getUserDropDownMyApiLink().click({force : true})
    };
    clickPaymentMenuLink() {
        this.elements.getPaymentMenuLink().click({force : true})
    };
    clickSupportHowToStartLink() {
        this.elements.getSupportHowToStartLink().click({ force: true });
    };
    clickUserDropDownMyProfileLink() {
        this.elements.getUserDropDownMyProfileLink().click({forse : true})
    };

    clickPricingLink() {
        this.elements.getPricingLink().click({ force: true });
    };
};
export default Header;