const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Since we're now in the reports folder, adjust paths accordingly
const options = {
    theme: 'bootstrap',
    jsonFile: 'cucumber-report.json',
    output: 'cucumber-bootstrap-report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "Local",
        "Browser": "Chromium",
        "Platform": "Windows",
        "Parallel": "Scenarios",
        "Executed": "Local"
    },
    failedSummaryReport: true,
    brandTitle: 'Playwright Cucumber Test Report',
    name: 'Cucumber Bootstrap Report',
    columnLayout: 1,
    storeScreenshots: true,
    noInlineScreenshots: false
};

try {
    reporter.generate(options);
    console.log('✅ Bootstrap report generated successfully!');
    console.log('📁 Report location: reports/cucumber-bootstrap-report.html');
} catch (error) {
    console.error('❌ Error generating Bootstrap report:', error.message);
    
    // Check if JSON file exists
    if (!fs.existsSync(options.jsonFile)) {
        console.log('💡 JSON report file not found. Make sure to run tests with JSON output first.');
        console.log('   Run: npm run cucumber-regression-json');
    }
}
