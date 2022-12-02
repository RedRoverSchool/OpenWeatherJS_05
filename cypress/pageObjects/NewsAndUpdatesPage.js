class NewsAndUpdatesPage {
    elements = {
        getNewsAndUpdatesTitle: () => cy.get('a[href*="teamandcompany"]')
    }
}

export default NewsAndUpdatesPage;