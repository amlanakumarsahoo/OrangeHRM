import { Page, Locator } from 'playwright';

export class OrangeHRMDashboardPage {
    private page: Page;
    
    // Locators
    private dashboardTitle: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.dashboardTitle = page.locator('.oxd-topbar-header-title');
    }
    
    /**
     * Wait for the dashboard title to be visible
     */
    async waitForDashboardTitle(): Promise<void> {
        await this.dashboardTitle.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    /**
     * Get the dashboard title text
     */
    async getDashboardTitle(): Promise<string | null> {
        return await this.dashboardTitle.textContent();
    }
    
    /**
     * Navigate to Recruitment section
     */
    async navigateToRecruitment(): Promise<void> {
        await this.page.click('text=Recruitment');
    }
}
