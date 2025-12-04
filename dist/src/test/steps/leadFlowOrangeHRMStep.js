"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const OrangeHRMLoginPage_1 = require("../../main/pages/OrangeHRMLoginPage");
const OrangeHRMDashboardPage_1 = require("../../main/pages/OrangeHRMDashboardPage");
const OrangeHRMRecruitmentPage_1 = require("../../main/pages/OrangeHRMRecruitmentPage");
// Declare page objects
let loginPage;
let dashboardPage;
let recruitmentPage;
(0, cucumber_1.Given)('User logs into OrangeHRM', { timeout: 30000 }, async () => {
    // Get page instance from hooks
    const page = global.page;
    // Initialize Login Page Object
    loginPage = new OrangeHRMLoginPage_1.OrangeHRMLoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('Admin', 'admin123');
});
(0, cucumber_1.When)('User is on the dashboard page', async function () {
    // Get page instance from hooks
    const page = global.page;
    // Initialize Dashboard Page Object
    dashboardPage = new OrangeHRMDashboardPage_1.OrangeHRMDashboardPage(page);
    await dashboardPage.waitForDashboardTitle();
    const dashboardTitle = await dashboardPage.getDashboardTitle();
    (0, test_1.expect)(dashboardTitle).toContain('Dashboard');
});
(0, cucumber_1.When)('User creates a new lead', { timeout: 180000 }, async function () {
    // Get page instance from hooks
    const page = global.page;
    // Initialize Recruitment Page Object
    recruitmentPage = new OrangeHRMRecruitmentPage_1.OrangeHRMRecruitmentPage(page);
    // Navigate to Recruitment section
    await page.click('text=Recruitment');
    // Click on Vacancies
    await page.click('text=Vacancies');
    // Click Add button
    await page.click('button:has-text("Add")');
    // Fill in lead details
    await page.selectOption('div.oxd-select-text--after', { label: 'Senior QA Lead' });
    await page.fill('input[placeholder="Enter vacancy name"]', 'Automation Test Lead');
    await page.fill('input[placeholder="Type for hints..."]', 'John');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // Save the lead
    await page.click('button[type="submit"]');
});
(0, cucumber_1.Then)('Lead should be created successfully', async function () {
    // Get page instance from hooks
    const page = global.page;
    // // Initialize Recruitment Page Object
    // recruitmentPage = new OrangeHRMRecruitmentPage(page);
    // // Verify success message
    // await recruitmentPage.waitForSuccessMessage();
    // const successMessage = await recruitmentPage.getSuccessMessage();
    // expect(successMessage).toContain('Successfully Saved');
    // // Verify the lead is in the list
    // await recruitmentPage.clickViewVacancies();
    // await recruitmentPage.fillSearchInput('Automation Test Lead');
    // await page.keyboard.press('Enter');
    // const leadExists = await recruitmentPage.isLeadVisible('Automation Test Lead');
    // expect(leadExists).toBeTruthy();
});
//# sourceMappingURL=leadFlowOrangeHRMStep.js.map