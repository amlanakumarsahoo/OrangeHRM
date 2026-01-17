import { HomePageOperations } from '../../main/operations/HomePageOperations';
import { getAutoExeApp } from '../../main/utilities/autoExe-utils';
import { expect, Page } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';

export let homePage: HomePageOperations;
let actualResult: string | null;

// Use regular functions to access 'this'
Given('User Visits HomePage', { timeout: 60000 }, async function () {
    const page = (global as any).page;
    homePage = await getAutoExeApp(page) as HomePageOperations;
});

When('User Observes HomePage Title', async function () {
    actualResult = await homePage.getTitle();
});

Then('title should match {string}', async function (_arg: string) {
    expect(actualResult).toEqual(_arg);
});

When('User Observes sub Title', async function () {
    actualResult = await homePage.getSubTitle();
});

Then('sub title should match {string}', async function (_arg: string) {
    expect(actualResult).toEqual(_arg);
});

  When('Subscription should be visible', async function () {
    expect(await homePage.getSubscriptionHeader()).toBeTruthy();
});

When('User enters email id and clicks on subscribe button', async function () {
    await homePage.enterEmailIdAndClickSubscribeButton();
});

Then('User should be able to verify subscription message {string}', async function (_arg: string) {
    actualResult = await homePage.getSubscriptionMessage();
    expect(actualResult).toEqual(_arg);
}); 