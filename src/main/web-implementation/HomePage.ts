import { HomePageOperations } from "@src/main/operations/HomePageOperations";
import { BasePage } from "@src/main/web-implementation/BasePage";
import { Page, Locator } from '@playwright/test';
export class HomePage extends BasePage implements HomePageOperations {
    //private readonly page;
    private readonly subTitleSelector: Locator; // data-testid = subtitle
    private readonly titleSelector: Locator;
    private readonly exampleSelector: Locator;
    private readonly signupSelector: Locator;
    constructor(page: any) {
        super();
        // Add null/undefined check for page parameter
        if (!page) {
            throw new Error('Page parameter cannot be null or undefined in HomePage constructor');
        }

        this.page = page;
        //this.page.locator.
        this.titleSelector = page.locator('//meta[@name="google-site-verification"]/following-sibling::title'); // data-testid = 'home-title'
        this.subTitleSelector = page.locator('h2'); // data-testid = 'home-subtitle'
        // this.exampleSelector = page.getByRole('listitem'); // data-testid = 'example-link'
        this.exampleSelector = page.locator('#content > ul > li > a');
        this.signupSelector = page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a');
        //this.page.goto(getHerokuAppUrl());
        //this.navigate();
    }
    doSignup(): Promise<void | null> {
        this.signupSelector.click();
        this.page.getUrl();
        return this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    }
    // Factory method - Only Holds good in Async Libraries
    static async create(page: Page) {
        const instance = new HomePage(page);
        // Do async initialization here (navigation)
        await instance.navigate();
        return instance;
    }

    async navigate(): Promise<void> {
        try {
            console.log('🌐 Starting navigation to automationexercise.com...');
            
            // Navigate to automation exercise website with explicit timeout
            await this.page.goto('https://automationexercise.com/', {
                waitUntil: 'domcontentloaded',
                timeout: 60000 // 60 seconds timeout
            });
            
            console.log('✅ Navigation completed successfully');
            
            // Wait for page to be fully loaded
            await this.page.waitForLoadState('domcontentloaded');
            console.log('✅ DOM content loaded');
            
        } catch (error: any) {
            console.error('❌ Navigation failed:', error);
            throw new Error(`Failed to navigate to automationexercise.com: ${error?.message || error}`);
        }
    }

    getFooterText(): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    // async gotoExample(exampleName: string): Promise<HomePageOperations> {
    //     const link = this.page.getByRole('link', { name: exampleName }).first();
    //     await link.waitFor({ state: 'visible', timeout: 15000 });
    //     await Promise.all([
    //         this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    //         link.click()
    //     ]);
    //     return CheckPageAndReturnPO(this.page, exampleName);

    // }
    async getSubTitle(): Promise<string | null> {
        await this.page.waitForLoadState('domcontentloaded');
        return this.subTitleSelector.textContent();
    }
    async getAvailableExamples(): Promise<string[] | null> {
        await this.page.waitForLoadState('domcontentloaded');
        return this.exampleSelector.allTextContents();
    }
    async getTitle(): Promise<string | null> {
        // Implementation to get the title from the home page
        //await this.page.waitForLoadState('domcontentloaded');
        return this.titleSelector.textContent();
    }
}

// function CheckPageAndReturnPO(page, expectedTitle) {
//     const abTestingPageModule = require('@src/web-implementation/ABTestingPage');
//     // Exception Handling
//     return new abTestingPageModule.ABTestingPage(page);
// }
