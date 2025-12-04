import { Page } from 'playwright';
export declare class OrangeHRMLoginPage {
    private page;
    private usernameInput;
    private passwordInput;
    private loginButton;
    private dashboardHeader;
    private errorMessage;
    constructor(page: Page);
    /**
     * Navigates to the OrangeHRM login page
     */
    navigateToLoginPage(): Promise<void>;
    /**
     * Performs login with provided credentials
     * @param username - Username for login (default: 'Admin')
     * @param password - Password for login (default: 'admin123')
     */
    login(username?: string, password?: string): Promise<void>;
    /**
     * Verifies if login was successful by checking for dashboard header
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * Gets the error message text if login fails
     */
    getErrorMessage(): Promise<string>;
    /**
     * Checks if login page is displayed
     */
    isLoginPage(): Promise<boolean>;
    /**
     * Takes a screenshot of the current page
     * @param path - Path where to save the screenshot
     */
    takeScreenshot(path: string): Promise<void>;
}
//# sourceMappingURL=OrangeHRMLoginPage.d.ts.map