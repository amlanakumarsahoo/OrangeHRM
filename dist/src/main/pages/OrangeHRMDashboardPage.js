"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeHRMDashboardPage = void 0;
class OrangeHRMDashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.locator('.oxd-topbar-header-title');
    }
    /**
     * Wait for the dashboard title to be visible
     */
    async waitForDashboardTitle() {
        await this.dashboardTitle.waitFor({ state: 'visible', timeout: 10000 });
    }
    /**
     * Get the dashboard title text
     */
    async getDashboardTitle() {
        return await this.dashboardTitle.textContent();
    }
    /**
     * Navigate to Recruitment section
     */
    async navigateToRecruitment() {
        await this.page.click('text=Recruitment');
    }
}
exports.OrangeHRMDashboardPage = OrangeHRMDashboardPage;
//# sourceMappingURL=OrangeHRMDashboardPage.js.map