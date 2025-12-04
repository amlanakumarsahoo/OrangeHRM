import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Create directories for videos and screenshots
const videosDir = path.join('results', 'videos');
const screenshotsDir = path.join('results', 'screenshots');

// Ensure directories exist
if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Global browser instance for all scenarios
BeforeAll(async function () {
    console.log('🚀 Starting browser session...');
});

AfterAll(async function () {
    console.log('🔚 Browser session completed');
});

// Before each scenario
Before({ timeout: 30000 }, async function () {
    console.log('🌟 Setting up browser for scenario...');
    
    try {
        // Launch browser
        browser = await chromium.launch({ 
            headless: false,
            slowMo: 100 // Add slight delay for better visibility
        });
        
        // Create new context for each scenario (isolation)
        const scenarioName = this.pickle?.name || 'unknown-scenario';
        const timestamp = Date.now();
        const videoPath = path.join(videosDir, `${scenarioName.replace(/\s+/g, '-')}-${timestamp}.webm`);
        
        context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            recordVideo: {
                dir: videosDir,
                size: { width: 1280, height: 720 }
            }
        });
        
        // Create new page
        page = await context.newPage();
        
        // Store in global scope for step definitions
        (global as any).browser = browser;
        (global as any).context = context;
        (global as any).page = page;
        
        console.log('✅ Browser setup completed successfully');
    } catch (error) {
        console.error('❌ Browser setup failed:', error);
        throw error;
    }
});

// After each scenario
After(async function (scenario) {
    console.log(`📸 Scenario "${scenario.pickle.name}" completed with status: ${scenario.result?.status}`);
    
    try {
        // Take screenshot on failure (only if page exists)
        if (scenario.result?.status === 'FAILED' && page) {
            const screenshotPath = path.join(screenshotsDir, `failed-${scenario.pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`);
            const screenshot = await page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            this.attach(screenshot, 'image/png');
            console.log(`📷 Screenshot captured for failed scenario: ${screenshotPath}`);
        }
        
        // Always take screenshot for passed scenarios too (optional)
        if (scenario.result?.status === 'PASSED' && page) {
            const screenshotPath = path.join(screenshotsDir, `passed-${scenario.pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`);
            await page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            console.log(`📷 Screenshot captured for passed scenario: ${screenshotPath}`);
        }
        
        // Close browser context and browser (this will save the video)
        if (context) {
            await context.close();
            console.log('🔒 Browser context closed');
            console.log(`🎥 Video saved to: ${videosDir}`);
        }
        if (browser) {
            await browser.close();
            console.log('🚪 Browser closed');
        }
        
        console.log('🧹 Browser cleanup completed');
    } catch (error) {
        console.error('⚠️ Error during cleanup:', error);
        // Continue with cleanup even if screenshot fails
        try {
            if (context) await context.close();
            if (browser) await browser.close();
        } catch (cleanupError) {
            console.error('❌ Final cleanup failed:', cleanupError);
        }
    }
});

// Export for use in step definitions if needed
export { browser, context, page };
