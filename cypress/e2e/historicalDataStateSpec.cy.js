import Header from "../pageObjects/Header.js"
import HistoricalDataStatePage from "../pageObjects/HistoricalDataStatePage.js";
import MarketplacePage from "../pageObjects/MarketplacePage.js"

const header = new Header();
const historicalDataStatePage = new HistoricalDataStatePage();
const marketplacePage = new MarketplacePage();

describe('Historical Data State Page test suite', () => {
    beforeEach(function () {
        cy.visit('/')
    });

    it('AT_061.003 | Marketplace > Historical Data Archives > Historical Weather Data by State > Verify sorted by names', function () {
        let statesArr = Array();
        header.clickMarketplaceMenuLink();
        marketplacePage.clickDocumentationBtnHistoricalByDataState();

        historicalDataStatePage.elements.getAllStateNames().each(($el, i) => {
            cy.wrap($el).invoke('text').then((nameState) => {
                statesArr.push(nameState)
            })
        }).then(() => {
            let sortStates = [...statesArr].sort((a, b) => a.localeCompare(b));

            expect(JSON.stringify(sortStates)).to.eql(JSON.stringify(statesArr))
        });
    });

});
