import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Global browser instance for all scenarios
BeforeAll(async function () {
    console.log('🚀 Starting browser session...');
});

AfterAll(async function () {
    console.log('🔚 Browser session completed');
});

// Before each scenario
Before(async function () {
    console.log('🌟 Setting up browser for scenario...');
    
    // Launch browser
    browser = await chromium.launch({ 
        headless: false,
        slowMo: 100 // Add slight delay for better visibility
    });
    
    // Create new context for each scenario (isolation)
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        // Add any other context options you need
    });
    
    // Create new page
    page = await context.newPage();
    
    // Store in global scope for step definitions
    (global as any).browser = browser;
    (global as any).context = context;
    (global as any).page = page;
});

// After each scenario
After(async function (scenario) {
    console.log(`📸 Scenario "${scenario.pickle.name}" completed with status: ${scenario.result?.status}`);
    
    // Take screenshot on failure
    if (scenario.result?.status === 'FAILED') {
        const screenshot = await page.screenshot({ 
            path: `test-results/failed-${scenario.pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`,
            fullPage: true 
        });
        this.attach(screenshot, 'image/png');
        console.log('📷 Screenshot captured for failed scenario');
    }
    
    // Close browser context and browser
    if (context) {
        await context.close();
    }
    if (browser) {
        await browser.close();
    }
    
    console.log('🧹 Browser cleanup completed');
});

// Export for use in step definitions if needed
export { browser, context, page };
