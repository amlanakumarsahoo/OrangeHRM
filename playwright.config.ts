import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Create the videos directory if it doesn't exist
const videosDir = path.join('playwright-report', 'videos');

// Ensure the videos directory exists
const fs = require('fs');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

export default defineConfig({
  testDir: './PlaywrightPractice',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  outputDir: 'playwright-report',
  
  // Configure test directory for videos
  testMatch: '**/*.spec.ts',
  
  use: {
    baseURL: 'https://www.google.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: {
      mode: 'on',
      size: { width: 1280, height: 720 }
    },
  },

  // Configure video output directory using the videosDir constant
  video: 'on',
  videoDir: videosDir,

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Override video settings at the project level
        video: 'on',
      },
    },
  ],

  // Configure web server if needed
  webServer: undefined,
});
