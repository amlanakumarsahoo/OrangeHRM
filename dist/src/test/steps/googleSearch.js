"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const GoogleSearchPage_1 = require("../../main/pages/GoogleSearchPage");
let googleSearchPage;
(0, cucumber_1.Given)('I am on Google', async function () {
    // Get page instance from hooks
    const page = global.page;
    // Initialize Page Object Model
    googleSearchPage = new GoogleSearchPage_1.GoogleSearchPage(page);
    // Get base URL from cucumber world parameters
    const baseUrl = this.parameters.baseUrl;
    // Navigate to Google using POM
    await googleSearchPage.navigateToGoogle(baseUrl);
    // Handle cookie consent if it appears
    await googleSearchPage.handleCookieConsent();
});
(0, cucumber_1.When)('I search for {string}', async function (searchTerm) {
    // Use Page Object Model to perform search
    await googleSearchPage.searchFor(searchTerm);
});
(0, cucumber_1.Then)('I should see the search results', async function () {
    // Verify search results using POM
    await googleSearchPage.verifySearchResults();
    // Take a screenshot for verification
    await googleSearchPage.takeScreenshot('test-results/google-search-results.png');
});
//# sourceMappingURL=googleSearch.js.map