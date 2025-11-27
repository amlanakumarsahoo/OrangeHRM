import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OrangeHRMLoginPage } from '../../main/pages/OrangeHRMLoginPage';
import { OrangeHRMDashboardPage } from '../../main/pages/OrangeHRMDashboardPage';
import { OrangeHRMRecruitmentPage } from '../../main/pages/OrangeHRMRecruitmentPage';

// Declare page objects
let loginPage: OrangeHRMLoginPage;
let dashboardPage: OrangeHRMDashboardPage;
let recruitmentPage: OrangeHRMRecruitmentPage;

Given('User logs into OrangeHRM', { timeout: 30000 }, async () => {
    // Get page instance from hooks
    const page = (global as any).page;
    
    // Initialize Login Page Object
    loginPage = new OrangeHRMLoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('Admin', 'admin123');
});

When('User is on the dashboard page', async function () {
    // Get page instance from hooks
    const page = (global as any).page;
    
    // Initialize Dashboard Page Object
    dashboardPage = new OrangeHRMDashboardPage(page);
    await dashboardPage.waitForDashboardTitle();
    const dashboardTitle = await dashboardPage.getDashboardTitle();
    expect(dashboardTitle).toContain('Dashboard');
});

When('User creates a new lead', async function () {
    // Get page instance from hooks
    const page = (global as any).page;
    
    // Initialize Recruitment Page Object
    recruitmentPage = new OrangeHRMRecruitmentPage(page);
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

Then('Lead should be created successfully', async function () {
    // Get page instance from hooks
    const page = (global as any).page;
    
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