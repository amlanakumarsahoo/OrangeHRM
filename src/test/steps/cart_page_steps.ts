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
    expect(await cartPage.getCartPageTitle()).toBeTruthy();  
});

Then('User add first product to cart', async function () {
    const page = (global as any).page;
    cartPage = await getCartPageApp(page) as CartPageOperations;
    await cartPage.addToCartFirstProduct();
});

Then('User click on continue shopping button', async function () {
    await cartPage.clickOnContinueShopping();
});

Then('User add second product to cart', async function () {
    await cartPage.addToCartSecondProduct();
});

Then('User navigates to cart page', async function () {
    await cartPage.navigateToCartPage();
});

Then('Verify all products added to cart', async function () {
    expect(await cartPage.verifyAllProductsAddedToCart()).toBeTruthy();
});

Then('User verify price quantity and total price', async function () {
    expect(await cartPage.verifyPriceQuantityAndTotalPrice()).toBeTruthy();
});
