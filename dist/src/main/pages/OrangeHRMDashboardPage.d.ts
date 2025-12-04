import { Page } from 'playwright';
export declare class OrangeHRMDashboardPage {
    private page;
    private dashboardTitle;
    constructor(page: Page);
    /**
     * Wait for the dashboard title to be visible
     */
    waitForDashboardTitle(): Promise<void>;
    /**
     * Get the dashboard title text
     */
    getDashboardTitle(): Promise<string | null>;
    /**
     * Navigate to Recruitment section
     */
    navigateToRecruitment(): Promise<void>;
}
//# sourceMappingURL=OrangeHRMDashboardPage.d.ts.map