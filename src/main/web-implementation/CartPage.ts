import { Locator, Page } from "playwright/test";
import { CartPageOperations } from "../operations/CartPageOperations";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage implements CartPageOperations {
    private readonly cartPageBtn: Locator;
    private readonly cartPageTitle: Locator;

    constructor(page: any) {
        super();
        this.page = page;
        this.cartPageBtn = page.getByRole('link', { name: ' Cart' });
        this.cartPageTitle = page.getByText('Shopping Cart')

    }
     static async create(page: Page) {
            const instance = new CartPage(page);
            return instance;
        }

    async navigateToCartPage(): Promise<void> {
        await this.cartPageBtn.click();
        await this.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    async getCartPageTitle(): Promise<string|null> {
        return this.cartPageTitle.textContent();
    }
}
