import { Page, Locator } from 'playwright';

export class OrangeHRMLoginPage {
    private page: Page;
    
    // Locators
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private dashboardHeader: Locator;
    private errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        // Locators for OrangeHRM login page
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.dashboardHeader = page.locator('.oxd-topbar-header-title');
        this.errorMessage = page.locator('.oxd-alert-content-text');
    }
    
    /**
     * Navigates to the OrangeHRM login page
     */
    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.page.waitForLoadState('networkidle');
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    /**
     * Performs login with provided credentials
     * @param username - Username for login (default: 'Admin')
     * @param password - Password for login (default: 'admin123')
     */
    async login(username: string = 'Admin', password: string = 'admin123'): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
    /**
     * Verifies if login was successful by checking for dashboard header
     */
    async isLoggedIn(): Promise<boolean> {
        try {
            await this.dashboardHeader.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
    
    /**
     * Gets the error message text if login fails
     */
    async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.innerText();
    }
    
    /**
     * Checks if login page is displayed
     */
    async isLoginPage(): Promise<boolean> {
        return await this.usernameInput.isVisible() && 
               await this.passwordInput.isVisible() && 
               await this.loginButton.isVisible();
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
