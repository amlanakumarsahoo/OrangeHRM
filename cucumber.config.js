const commonConfig = {
  requireModule: ['ts-node/register'],
  require: ['src/test/steps/**/*.ts', 'src/main/hooks.ts'],
  format: [
    'progress',
    'html:playwright-report/cucumber-html-report.html',
    'json:playwright-report/reports/cucumber-report.json'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  publishQuiet: true
};

module.exports = {
  default: {
    ...commonConfig,
    worldParameters: {
      baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      environment: 'default'
    }
  },
  test: {
    ...commonConfig,
    worldParameters: {
      baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      environment: 'test'
    }
  },
  stage: {
    ...commonConfig,
    worldParameters: {
      baseUrl: 'https://stage.orangehrmlive.com',
      environment: 'stage'
    }
  },
  prod: {
    ...commonConfig,
    worldParameters: {
      baseUrl: 'https://orangehrmlive.com',
      environment: 'prod'
    }
  }
};
