const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Use the current directory (playwright-report) where cucumber generates the JSON
const playwrightReportDir = __dirname;

const options = {
    theme: 'bootstrap',
    jsonDir: playwrightReportDir,
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
