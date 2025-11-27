import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { GoogleSearchPage } from '../../main/pages/GoogleSearchPage';

let googleSearchPage: GoogleSearchPage;

Given('I am on Google', async function () {
    // Get page instance from hooks
    const page = (global as any).page;
    
    // Initialize Page Object Model
    googleSearchPage = new GoogleSearchPage(page);
    
    // Get base URL from cucumber world parameters
    const baseUrl = this.parameters.baseUrl;
    
    // Navigate to Google using POM
    await googleSearchPage.navigateToGoogle(baseUrl);
    
    // Handle cookie consent if it appears
    await googleSearchPage.handleCookieConsent();
});

When('I search for {string}', async function (searchTerm: string) {
    // Use Page Object Model to perform search
    await googleSearchPage.searchFor(searchTerm);
});

Then('I should see the search results', async function () {
    // Verify search results using POM
    await googleSearchPage.verifySearchResults();
    
    // Take a screenshot for verification
    await googleSearchPage.takeScreenshot('test-results/google-search-results.png');
    
});