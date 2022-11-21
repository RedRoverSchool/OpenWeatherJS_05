/// <reference types="cypress"/> 


describe('groupBugHunters', () => {

  beforeEach(function () {

    cy.visit('https://openweathermap.org/');

  });

  it('AT_006.001 | Main page > Sign in', function () {
    cy.get('li.user-li').contains('Sign in').click({ force: true })
    cy.get('#user_email')
      .should('have.attr', 'placeholder', 'Enter email')
      .type('oforostinko@gmail.com')
    cy.get('#user_password.form-control')
      .should('have.attr', 'placeholder', 'Password')
      .type('12341234')
    cy.get('#user_remember_me').check().should('be.checked')
    cy.contains('Submit').click()
    cy.get('.panel-body').should('have.text', 'Signed in successfully.')
  })

  it('AT_029.001 | Footer >Download OpenWeather App> Verify two icons are visible', function () {
    cy.get('.my-5 a[href*=apple]').should('be.visible')
    cy.get('.my-5 a[href*=google]').should('be.visible')
  })

  it("AT_029.002 | Footer >Download OpenWeather App> Download on the App Store' button link", function () {
    cy.get('.my-5 a[href*=apple]').invoke('removeAttr', 'target').click()
    cy.url().should('eq', 'https://apps.apple.com/gb/app/openweather/id1535923697')
  })

  it("AT_027.003 |Maps > Section with the scale", function () {
    cy.get('#desktop-menu [href="/weathermap"]').click({ force: true });
    cy.url().should('include', '/weathermap');
    cy.get('[for="Global Precipitation"]').click({ force: true });
    cy.get('.scale-details >div:first-child')
      .should('contain', 'Precipitation, mm/h');
  })

  it('AT_008.004 | Main menu > Guide | Verify the button "Subscribe to One Call by Call" is clickable and user be redirected new url', () => {
    cy.get('#desktop-menu').contains('Guide').click({ force: true });
    cy.get('center a[href="/price"]').click();
    cy.url().should('contain', '/price');
  })

  it('AT_018.005 | Support > Drop down menu> FAQ link opens', () => {
    let faqInSupport = '.dropdown-menu a[href="/faq"]'

    cy.get('#support-dropdown').click()
    cy.get('#support-dropdown-menu').should('be.visible')
    cy.get(faqInSupport).click()
    cy.url().should('contain', '/faq')
  })

  it("AT_029.003 | Footer >Download OpenWeather App> Download on the Google play' button link", function () {
    cy.get('.my-5 a[href*=google]').invoke('removeAttr', 'target').click()
    cy.url().should('eq', 'https://play.google.com/store/apps/details?id=uk.co.openweather')
  })

  it('AT_008.007 | Main menu > Guide > Verify user will be redirected to new url "/guide"', () => {
    cy.get('#desktop-menu a[href="/guide"]').click()
    cy.url().should('include', '/guide')
  })

  it('AT_033.011 | Header > Navigation > Verify "API" menu link', function () {
    cy.get('#desktop-menu a[href="/api"]').click()
    cy.url().should('eq', 'https://openweathermap.org/api')
  })

  it('AT_001.013 | Main page > Search section > Verify "Search City" valid input shows dropdown', () => {
    const cityName = 'New York'

    cy.get('.search input').type(cityName)
    cy.get('button[type = "submit"]').click()
    cy.get('ul.search-dropdown-menu')
      .should('be.visible')
      .should('contain.text', cityName)
  })

  it('AT_009.006 | Main menu > Marketplace > verify that user will be redirected to new URL "Marketplace', function () {
    const marketplace = '#desktop-menu a[href*="marketplace"]'
    cy.get(marketplace).invoke('removeAttr', 'target').click({ force: true })
    cy.url().should('eq', 'https://home.openweathermap.org/marketplace')
  })

  it('AT_008.008 | Main menu > Guide > Verify the user redirected to new url', () => {
    cy.get('#desktop-menu a[href="/guide"]').click({ force: true });
    cy.url().should('eq', 'https://openweathermap.org/guide');
  })

  it('AT_032.002 | Header > Account Dropdown Menu > My Profile > Password Change> Verify successful notification', function () {
    cy.get('.user-li').as('SignInButton').click()
    cy.get('.new_user .email').as('EnterEmailField').type('redrover@mailto.plus')
    cy.get('#user_password').as('PasswordField').type('123456789')
    cy.get('.btn-color[value="Submit"]').as('SummitButton').click()

    cy.get('.inner-user-container').as('AccountDropdownMenu').click()
    cy.get('.dropdown-visible li:nth-child(4)').as('MyProfileButton').click()
    cy.get('#password_form_password').as('PasswordChangeField').type('123456789')
    cy.get('#password_form_password_confirmation').as('ConfirmPasswordField').type('123456789')
    cy.get('.btn-default[value="Change Password"]').as('ChangePasswordButton').click()

    cy.get('div[class="panel panel-green"]').as('NoticeChangePassword')
      .should('include.text', 'Password was changed successfully').and('include.text', 'Notice').and('be.visible')
  })

  it('AT_008.010 | Main menu > Guide > The user is redirected to new url "/api#current" after clicking first button "Learn more"', () => {
    cy.get('#desktop-menu a[href="/guide"]').click()
    cy.get('a[href="/api#current"][class="ow-btn round btn-orange"]').click()
    cy.url().should('include', '/api#current')
    cy.get('section[id="current"] h2').should('have.text', 'Current & Forecast weather data collection')
  })

  it('009.007 | Main menu > Marketplace > Verification of displayed "Documentation" button for History bulk', function () {
    const marketplace = '#desktop-menu a[href*="marketplace"]'
    const documentationButton = '.product a[href="https://openweathermap.org/history-bulk"]'

    cy.get(marketplace).invoke('removeAttr', 'target').click({ force: true })
    cy.get(documentationButton).should('be.visible').invoke('removeAttr', 'target').click()
  })

  it('AT_008.009 | Main menu > Guide > Verify text on the page', () => {
    cy.get('#desktop-menu').contains('Guide').click({ force: true });
    cy.get('.col-sm-12 h1').should('have.text', 'Weather data in a fast and easy-to-use way');
    cy.get('.col-sm-12 > :nth-child(6)').should('have.text', 'OpenWeather products');
    cy.get(':nth-child(13) > b').should('have.text', 'Professional collections:');
    cy.get('ol > :nth-child(14)').should('have.text', 'Dedicated weather products ');
    cy.get('ol > :nth-child(21)').should('have.text', 'Openweather NWP model');
    cy.get('ol > :nth-child(24)').should('have.text', 'How to start using Weather API');
  })

  it('AT_056.001 | My API keys > Managing API keys> Verify creation and deletion of an API key', function () {
    cy.get('.user-li').as('SignInButton').click()
    cy.get('.new_user .email').as('EnterEmailField').type('redrover@mailto.plus')
    cy.get('#user_password').as('PasswordField').type('123456789')
    cy.get('.btn-color[value="Submit"]').as('SummitButton').click()
    cy.get('.inner-user-container').as('AccountDropdownMenu').click()
    cy.get('.dropdown-visible li:nth-child(2)').as('MyProfileButton').click()
    cy.url().should('include', '/api_keys')

    cy.get('#api_key_form_name').as('API_keyNameField')
      .type('testAPIkey').and('have.value', 'testAPIkey').and('be.visible')
    cy.get('.col-md-4 .button-round').as('GenerateButton').click()
    cy.get('.material_table tr:nth-child(2)').as('CreatedKey')
      .should('exist')
      .should('be.visible')
    cy.get('.col-md-6').as('NoticeCreateKey')
      .should('include.text', 'API key was created successfully').and('include.text', 'Notice').and('be.visible')
    cy.reload()
    cy.get('@CreatedKey').should('be.visible')
    cy.get('.api-keys tr:nth-child(2) .fa-remove').as('DeleteButton').click()
    cy.get('.col-sm-offset-2').as('NoticeDeleteKey')
      .should('include.text', 'API key was deleted successfully').and('include.text', 'Notice').and('be.visible')
    cy.get('@CreatedKey').should('not.exist')
  })

  it('AT_033.016 | Header > Navigation', function () {
    cy.get('#desktop-menu a[href="/guide"]').click({ force: true })
    cy.url().should('include', '/guide')
  })

  it('AT_009.008 | <Menu> Marketplace > Verification than "Place order" button is displayed and leads to URL', function () {
    const marketplace = '#desktop-menu a[href*="marketplace"]'
    const historyBulk = 'h5 a[href="/history_bulks/new"]'
    const placeOrderButton = 'div.button-container a[href="/history_bulks/new"]'

    cy.get(marketplace).invoke('removeAttr', 'target').click({ force: true })
    cy.get(historyBulk).should('be.visible')
    cy.get(placeOrderButton).should('be.visible').click()
    cy.url().should('eq', 'https://home.openweathermap.org/history_bulks/new')
  })

  it('AT_041.001 | Header > User > My API keys > The registered user is redirected to the My API keys page', () => {
    cy.get('li.user-li a[href*="sign_in"]').click()
    cy.get('.new_user .email').type('redroverschool@yahoo.com')
    cy.get('#user_password').type('123456789')
    cy.get('input[value="Submit"]').click()

    cy.get('#user-dropdown').click()
    cy.get('#user-dropdown-menu a[href="/api_keys"]').click()
    cy.url().should('include', '/api_keys')
    cy.get('div.alert-info').should('contain', 'You can generate as many API keys as needed for your subscription. We accumulate the total load from all of them.')
      .and('be.visible')
  })

  it('AT_032.003 | Header > Account Dropdown Menu > My Profile > Password Change > Verify successful password change', () => {
    cy.get('li.user-li a[href*="sign_in"]').click()
    cy.get('.new_user .email').type('redroverschool@yahoo.com')
    cy.get('#user_password').type('123456789')
    cy.get('input[value="Submit"]').click()

    cy.get('#user-dropdown').click()
    cy.get('a[href*="/home"]').contains('My profile').click()
    cy.url().should('include', '/home')
    cy.get('ul.nav-tabs li:nth-child(8)').should('have.class', 'active')

    cy.get('#password_form_password').type('123456789')
    cy.get('#password_form_password_confirmation').type('123456789')
    cy.get('input[value="Change Password"]').click()
    cy.get('.panel-body').should('be.visible').and('have.text', 'Password was changed successfully')
  })

  it('AT_027.005 | Maps > Section with the scale > The scale names matches the label after selecting "Wind speed"', function () {
    cy.get('#desktop-menu a[href="/weathermap"]').click()
    cy.get('label[for="Wind speed"]').click()
    cy.get('.scale-details:first-child').should('contain.contain.text', 'Wind speed')
  })

  it('AT_056.002 | My API keys > Managing API keys> Verify rename an API key', function () {
    cy.get('.user-li').as('SignInButton').click()
    cy.get('.new_user .email').as('EnterEmailField').type('yurik@mailto.plus')
    cy.get('#user_password').as('PasswordField').type('12345678')
    cy.get('.btn-color[value="Submit"]').as('SummitButton').click()
    cy.get('.inner-user-container').as('AccountDropdownMenu').click()
    cy.get('.dropdown-visible li:nth-child(2)').as('MyProfileButton').click()
    cy.url().should('include', '/api_keys')

    cy.get('.api-keys tbody td:nth-child(2)').as('APIkey').should('have.text', 'Default')
    cy.get('.edit-key-btn').as('EditButton').click()
    cy.get('#edit_key_form_name').as('EditNameField')
      .clear()
      .type('New_API_key')
      .should('be.visible')
    cy.get('.pop-up-footer .dark').as('SaveButton').click()
    cy.get('@APIkey').should('have.text', 'New_API_key')
    cy.get('.col-sm-offset-2 .panel').as('NoticeRenameKey')
      .should('include.text', 'API key was edited successfully')
      .and('include.text', 'Notice')
      .and('be.visible')

    //Return previous name of the key
    cy.get('@EditButton').click()
    cy.get('@EditNameField').clear().type('Default')
    cy.get('@SaveButton').click()
  })

  it('AT_001.016 | Main page > Section with search > Search City', () => {
    const city = 'Boston';
    cy.get('div.search').should('be.visible').click({ force: true }).type(city);
    cy.get('.button-round').click();
    cy.get(':nth-child(1) > [style="width: 140px;"]').click();
    cy.get('.current-container > :nth-child(1) > h2').should('contain', city);
  })

  it('TC_046.002|Click on the link “Learn more” should take user to the new page', function () {
    cy.get('#desktop-menu [href="/our-initiatives"]').click();
    cy.get('.col-sm-12 :nth-child(9) h2>span')
      .as('Education')
      .should('have.text', 'Education');
    cy.get('center a')
      .as('LearnMore')
      .should('have.text', 'Learn more');
    cy.get('@LearnMore').click();
    cy.url().should('include', '/student-initiative');
    cy.get('h1.breadcrumb-title').should('have.text', 'Student initiative');
  })

  it('AT_042.003 | User page > My payments > User is redirected to the "Payments" page', () => {
    cy.get('li.user-li a[href*="sign_in"]').click()
    cy.get('.new_user .email').type('redroverschool@yahoo.com')
    cy.get('#user_password').type('123456789')
    cy.get('input[value="Submit"]').click()

    cy.get('#user-dropdown').click()
    cy.get('#user-dropdown-menu a[href="/payments"]').click()
    cy.url().should('include', '/payments')
    cy.get('.table-striped').should('contain', 'Number #')
      .and('contain', 'Date')
      .and('contain', 'Amount')
  })
})