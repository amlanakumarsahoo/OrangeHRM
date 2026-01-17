import { Locator, Page } from "playwright/test";
import { CartPageOperations } from "../operations/CartPageOperations";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage implements CartPageOperations {
    private readonly cartPageBtn: Locator;
    private readonly cartPageTitle: Locator;
    private readonly ProductOneAddToCartButton: Locator;
    private readonly ProductTwoAddToCartButton: Locator;
    private readonly continueShoppingBtn: Locator;
    private readonly cartFirstProductPrice: Locator;
    private readonly cartSecondProductPrice: Locator;
    private readonly cartFirstProductQuantity: Locator;
    private readonly cartSecondProductQuantity: Locator;
    private readonly cartFirstProductTotalPrice: Locator;
    private readonly cartSecondProductTotalPrice: Locator;
    private readonly productAddedToCartConfirmationText: Locator;

    constructor(page: any) {
        super();
        this.page = page;
        this.cartPageBtn = page.getByRole('link', { name: ' Cart' });
        this.cartPageTitle = page.getByText('Shopping Cart')
        this.ProductOneAddToCartButton = page.locator('(//a[@data-product-id="1"])[1]');
        this.ProductTwoAddToCartButton = page.locator('(//a[@data-product-id="2"])[1]');
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartFirstProductPrice = page.locator('#product-1 td + td + td p').first();
        this.cartSecondProductPrice = page.locator('#product-2 td + td + td p').first();
        this.cartFirstProductQuantity = page.locator('.disabled').nth(0);
        this.cartSecondProductQuantity = page.locator('.disabled').nth(1);
        this.cartFirstProductTotalPrice = page.locator('.cart_total').nth(0);
        this.cartSecondProductTotalPrice = page.locator('.cart_total').nth(1);
        this.productAddedToCartConfirmationText = page.getByText('Product has been added to your cart');
    }

    //Create instance of CartPage
    static async create(page: Page) {
        const instance = new CartPage(page);
        return instance;
    }

    //Navigate to cart page
    async navigateToCartPage(): Promise<void> {
        await this.cartPageBtn.click();
        await this.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    }

    //Get cart page title
    async getCartPageTitle(): Promise<string | null> {
        return this.cartPageTitle.textContent();
    }

    //Click on first product and add to cart
    async addToCartFirstProduct(): Promise<void> {
        await this.ProductOneAddToCartButton.click();
    }

    //Click on second product and add to cart
    async addToCartSecondProduct(): Promise<void> {
        await this.ProductTwoAddToCartButton.click();
    }
    //Click on continue shopping button
    async clickOnContinueShopping(): Promise<void> {
        await this.continueShoppingBtn.click();
    }
    //Verify all products added to cart
    async verifyAllProductsAddedToCart(): Promise<boolean> {
        return this.productAddedToCartConfirmationText.isVisible();
    }

    //Verify price quantity and total price
    async verifyPriceQuantityAndTotalPrice(): Promise<boolean | null> {
        const firstProductPrice = await this.cartFirstProductPrice.textContent();
        const secondProductPrice = await this.cartSecondProductPrice.textContent();
        const firstProductQuantity = await this.cartFirstProductQuantity.textContent();
        const secondProductQuantity = await this.cartSecondProductQuantity.textContent();
        const firstProductTotalPrice = await this.cartFirstProductTotalPrice.textContent();
        const secondProductTotalPrice = await this.cartSecondProductTotalPrice.textContent();

        // Check if any of the text content is null
        if (!firstProductPrice || !secondProductPrice || !firstProductQuantity ||
            !secondProductQuantity || !firstProductTotalPrice || !secondProductTotalPrice) {
            console.error('One or more cart elements could not be found or have no text content');
            return null;
        }

        const firstProductPriceNumber = Number(firstProductPrice.replace("Rs. ", "").trim());
        const secondProductPriceNumber = Number(secondProductPrice.replace("Rs. ", "").trim());
        const firstProductQuantityNumber = Number(firstProductQuantity);
        const secondProductQuantityNumber = Number(secondProductQuantity);
        const firstProductTotalPriceNumber = Number(firstProductTotalPrice.replace("Rs. ", "").trim());
        const secondProductTotalPriceNumber = Number(secondProductTotalPrice.replace("Rs. ", "").trim());

        if (firstProductPriceNumber * firstProductQuantityNumber === firstProductTotalPriceNumber &&
            secondProductPriceNumber * secondProductQuantityNumber === secondProductTotalPriceNumber) {
            return true;
        }
        else return false;
    }
}
