// import { Given, When, Then } from "@cucumber/cucumber";
// import { ProductsPageOperations } from "@src/main/operations/ProductsPageOperations";
// import { getProductsPageApp } from "@src/main/utilities/autoExe-utils";
// import { expect, Page } from "@playwright/test";

// export let productsPage: ProductsPageOperations;

// When('User navigates to Products tab', async ({page}) => {
//     productsPage = await getProductsPageApp(page) as ProductsPageOperations;
//     await productsPage.navigateToProductsPage();

// });

// Then('User should be redirected to All Products page', async ({}) => {
//     expect(await productsPage.verifyAllProductsPage()).toBe('All Products');

// });

// Then('User verifies product list', async ({}) => {
//     expect(await productsPage.verifyProductListCount()).toBeGreaterThan(0);
   
// });

// Then('User clicks on first product', async ({}) => {
//     await productsPage.viewFirstProduct();
// });

// Then('User landed to product detail page', async ({}) => {
//     await productsPage.verifyProductDetails();
//     expect(await productsPage.verifyProductDetails()).toBeTruthy();
// });

// Then('User verifies product name, category, price, availability, condition, brand', async ({}) => {
//     expect(await productsPage.verifyProductDetails()).toBeTruthy();
// });

import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { ProductsPageOperations } from '../../main/operations/ProductsPageOperations';
import { getProductsPageApp } from '../../main/utilities/autoExe-utils';

export let productsPage: ProductsPageOperations;
const page = (global as any).page;
// Step: Navigate to Products tab
When('User navigates to Products tab', async function () {
    productsPage = await getProductsPageApp(page) as ProductsPageOperations;
    await productsPage.navigateToProductsPage();
});

// Step: Verify redirect to All Products page
Then('User should be redirected to All Products page', async function () {
    expect(await productsPage.verifyAllProductsPage()).toBe('All Products');
});

// Step: Verify product list is not empty
Then('User verifies product list', async function () {
    expect(await productsPage.verifyProductListCount()).toBeGreaterThan(0);
});

// Step: Click on first product
Then('User clicks on first product', async function () {
    await productsPage.viewFirstProduct();
});

// Step: Verify product details page
Then('User landed to product detail page', async function () {
    expect(await productsPage.verifyProductDetails()).toBeTruthy();
});

// Step: Verify product attributes
Then('User verifies product name, category, price, availability, condition, brand', async function () {
    expect(await productsPage.verifyProductDetails()).toBeTruthy();
});
