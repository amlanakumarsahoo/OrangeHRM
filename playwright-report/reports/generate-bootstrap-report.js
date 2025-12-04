const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure the reports directory exists
const reportsDir = path.join(__dirname, '..', 'reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

// Ensure the playwright-report directory exists
const playwrightReportDir = path.join(__dirname, '..', 'playwright-report');
if (!fs.existsSync(playwrightReportDir)) {
    fs.mkdirSync(playwrightReportDir, { recursive: true });
}

const options = {
    theme: 'bootstrap',
    jsonDir: reportsDir,
    output: path.join(playwrightReportDir, 'cucumber-bootstrap-report.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
        "App Name": "OrangeHRM Test Automation",
        "Test Environment": "STAGING",
        "Browser": "Chrome",
        "Platform": "Windows 10",
        "Executed": new Date().toLocaleString()
    },
    failedSummaryReport: true,
    ignoreBadJsonFile: true
};

reporter.generate(options);
console.log(`Bootstrap report generated at: ${options.output}`);
