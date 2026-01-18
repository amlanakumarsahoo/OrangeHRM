import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { ProductsPageOperations } from '../../main/operations/ProductsPageOperations';
import { getProductsPageApp } from '../../main/utilities/autoExe-utils';
import { productsPage } from './home_page_steps';

let page = (global as any).page;
// Step: Navigate to Products tab
When('User navigates to Products tab', async function () {
    const localProductsPage = await getProductsPageApp(page) as ProductsPageOperations;
    await localProductsPage.navigateToProductsPage();
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

// Step: Search for product
Then('User search for product {string}', async function (productName: string) {
    await productsPage.searchProduct(productName);
});
