const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Use the current directory (playwright-report) where cucumber generates the JSON
const playwrightReportDir = __dirname;

// Verify JSON report exists before generating bootstrap report
const jsonReportFile = path.join(playwrightReportDir, 'cucumber-report.json');
if (!fs.existsSync(jsonReportFile)) {
    console.error('❌ Error: cucumber-report.json not found. Please run tests first.');
    process.exit(1);
}

console.log('📊 Generating bootstrap report from:', jsonReportFile);

const options = {
    theme: 'bootstrap',
    jsonDir: playwrightReportDir,
    output: path.join(playwrightReportDir, 'cucumber-bootstrap-report.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    storeScreenshots: true,
    noInlineScreenshots: false,
    screenshotsDirectory: path.join(__dirname, '..', 'screenshots'),
    // Enhanced options for better example table support
    brandTitle: 'OrangeHRM Test Automation Report',
    name: 'OrangeHRM',
    columnLayout: 1,
    // Ensure example tables are displayed properly
    reportSuiteAsScenarios: false, // Changed to false for better outline support
    metadata: {
        "App Name": "OrangeHRM Test Automation",
        "Test Environment": "STAGING",
        "Browser": "Chrome",
        "Platform": "Windows 10",
        "Executed": new Date().toLocaleString(),
        "Report Generated": new Date().toISOString()
    },
    failedSummaryReport: true,
    ignoreBadJsonFile: true
};

reporter.generate(options);
console.log(`🎉 Bootstrap report generated successfully!`);
console.log(`📄 Report location: ${options.output}`);
console.log(`🔗 Open in browser: file:///${options.output.replace(/\\/g, '/')}`);
