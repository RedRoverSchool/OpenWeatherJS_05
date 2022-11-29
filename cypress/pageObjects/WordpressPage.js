class WordpressPage {

    elements = {
        getHeaderGetWordPressBtn: () => cy.get('a.global-header__desktop-get-wordpress')
    }
}

export default WordpressPage;