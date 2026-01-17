import { Then, When } from "@cucumber/cucumber";
import { CartPageOperations } from "@src/main/operations/CartPageOperations";
import { getCartPageApp } from "@src/main/utilities/autoExe-utils";
import { expect } from "playwright/test";

let cartPage:CartPageOperations;

Then('User clicks on Cart button', { timeout: 60000 }, async function () {
    const page = (global as any).page;
    cartPage = await getCartPageApp(page) as CartPageOperations;
    await cartPage.navigateToCartPage();
});

Then('user should be redirected to the cart page', async function () {
    let actualResult = await cartPage.getCartPageTitle();
    expect(actualResult).toBeTruthy();  
});
