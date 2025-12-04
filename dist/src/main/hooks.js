"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = exports.context = exports.browser = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const cucumber_2 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
const fs_1 = __importDefault(require("fs"));
let browser;
let context;
let page;
// Global browser instance for all scenarios
(0, cucumber_1.BeforeAll)(async function () {
    console.log('🚀 Starting browser session...');
});
(0, cucumber_1.AfterAll)(async function () {
    console.log('🔚 Browser session completed');
});
// Before each scenario
(0, cucumber_1.Before)(async function () {
    console.log('🌟 Setting up browser for scenario...');
    // Launch browser
    exports.browser = browser = await playwright_1.chromium.launch({
        headless: false,
        slowMo: 100 // Add slight delay for better visibility
    });
    // Create new context for each scenario (isolation)
    exports.context = context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        // Add any other context options you need
    });
    // Create new page
    exports.page = page = await context.newPage();
    // Store in global scope for step definitions
    global.browser = browser;
    global.context = context;
    global.page = page;
});
// After each scenario
(0, cucumber_1.After)(async function (scenario) {
    console.log(`📸 Scenario "${scenario.pickle.name}" completed with status: ${scenario.result?.status}`);
    // Take screenshot on failure
    if (scenario.result?.status === cucumber_2.Status.FAILED) {
        try {
            if (page) {
                // Ensure output directory exists
                const outDir = 'test-results';
                if (!fs_1.default.existsSync(outDir)) {
                    fs_1.default.mkdirSync(outDir, { recursive: true });
                }
                const fileSafeName = scenario.pickle.name.replace(/\s+/g, '-');
                const screenshot = await page.screenshot({
                    path: `${outDir}/failed-${fileSafeName}-${Date.now()}.png`,
                    fullPage: true
                });
                this.attach(screenshot, 'image/png');
                console.log('📷 Screenshot captured for failed scenario');
            }
            else {
                console.warn('⚠️ No page available to capture screenshot');
            }
        }
        catch (err) {
            console.error('📸 Screenshot capture failed:', err);
        }
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
// Increase default step/hook timeout to avoid premature failures during setup
(0, cucumber_2.setDefaultTimeout)(60 * 1000);
//# sourceMappingURL=hooks.js.map