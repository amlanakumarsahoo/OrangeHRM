import { Page, Locator } from 'playwright';

export class OrangeHRMLogoutPage {
    private page: Page;
    
    // Locators
    private userDropdown: Locator;
    private logoutButton: Locator;
    private usernameInput: Locator; // To verify we're back on login page
    
    constructor(page: Page) {
        this.page = page;
        // Locators for OrangeHRM logout functionality
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.locator('text=Logout');
        this.usernameInput = page.locator('input[name="username"]'); // Login page indicator
    }
    
    /**
     * Performs logout by clicking user dropdown and logout button
     */
    async logout(): Promise<void> {
        // Click on user profile dropdown
        await this.userDropdown.click();
        
        // Wait for dropdown menu to appear and click logout
        await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.logoutButton.click();
        
        // Wait for navigation to complete
        await this.page.waitForLoadState('networkidle');
    }
    
    /**
     * Verifies if logout was successful by checking if we're on login page
     */
    async isLoggedOut(): Promise<boolean> {
        try {
            // Wait for login page to load (verify logout was successful)
            await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
            
            // Verify we're back on login page by checking URL
            const currentUrl = this.page.url();
            return currentUrl.includes('/auth/login') || currentUrl.includes('login');
        } catch {
            return false;
        }
    }
    
    /**
     * Checks if user dropdown is visible (indicates user is logged in)
     */
    async isUserDropdownVisible(): Promise<boolean> {
        return await this.userDropdown.isVisible();
    }
    
    /**
     * Gets the current page URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
    
    /**
     * Waits for logout to complete and verifies success
     */
    async waitForLogoutComplete(): Promise<void> {
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    /**
     * Takes a screenshot of the current page
     * @param path - Path where to save the screenshot
     */
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ 
            path: path,
            fullPage: true 
        });
    }
}
