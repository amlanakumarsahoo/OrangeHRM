// import { HomePageOperations } from '@src/main/operations/HomePageOperations';
// import { getAutoExeApp } from '@src/main/utilities/autoExe-utils';
// import { expect } from '@playwright/test';
// import { Given, When, Then } from "@cucumber/cucumber";
// export let homePage:HomePageOperations;
// let actualResult:string|null;
// Given('User Visits HomePage', async ({page}) => {
//   homePage = await getAutoExeApp(page) as HomePageOperations;
// });

// When('User Observes HomePage Title', async ({}) => {
//   actualResult =await homePage.getTitle();
// });

// Then('title should match {string}', async ({}, arg) => {
//   expect(actualResult).toEqual(arg);
// });

// When('User Observes sub Title', async ({}) => {
//   actualResult =await homePage.getSubTitle();
// });

// Then('sub title should match {string}', async ({}, arg: string) => {
//   expect(actualResult).toEqual(arg);
// });

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
