import { Page, Locator } from 'playwright';

export class GoogleSearchPage {
    private page: Page;
    
    // Locators
    private searchInput: Locator;
    private searchButton: Locator;
    private searchResults: Locator;
    private resultItems: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('textarea[name="q"], input[name="q"]');
        this.searchButton = page.locator('input[name="btnK"], button[aria-label="Google Search"]');
        this.searchResults = page.locator('#search, #rso');
        this.resultItems = page.locator('#search .g, #rso .g, .g');
    }
    
    async navigateToGoogle(baseUrl: string): Promise<void> {
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('networkidle');
        
        // Wait for search input to be visible
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    async searchFor(searchTerm: string): Promise<void> {
        // Wait for search input and fill it
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill(searchTerm);
        
        // Press Enter to search
        await this.searchInput.press('Enter');
        
        // Wait for search results to load
        await this.page.waitForLoadState('networkidle');
        
        // Wait for results container to appear
        await this.searchResults.first().waitFor({ state: 'visible', timeout: 15000 });
    }
    
    async verifySearchResults(): Promise<void> {
        // Wait for search results container
        await this.searchResults.first().waitFor({ state: 'visible' });
        
        // Verify that there are actual result items
        await this.resultItems.first().waitFor({ state: 'visible', timeout: 10000 });
        
        const count = await this.resultItems.count();
        if (count === 0) {
            throw new Error('No search results found');
        }
    }
    
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ 
            path: path,
            fullPage: true 
        });
    }
    
    // Helper method to handle cookie consent if it appears
    async handleCookieConsent(): Promise<void> {
        try {
            const acceptButton = this.page.locator('button:has-text("Accept all"), button:has-text("I agree"), #L2AGLb');
            if (await acceptButton.isVisible({ timeout: 3000 })) {
                await acceptButton.click();
                await this.page.waitForTimeout(1000);
            }
        } catch (error) {
            // Cookie consent not found or already handled
            console.log('Cookie consent not found or already handled');
        }
    }
}
