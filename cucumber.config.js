module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/test/steps/**/*.ts', 'src/main/hooks.ts'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    worldParameters: {
      baseUrl: 'https://www.google.com'
    }
  }
};
