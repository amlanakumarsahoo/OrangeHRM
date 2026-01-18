import { Locator, Page } from "@playwright/test";
import { ProductsPageOperations } from "../operations/ProductsPageOperations";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage implements ProductsPageOperations {
    private readonly productsTab: Locator;
    private readonly productsPageHeader: Locator;
    private readonly productName: Locator;
    private readonly productCategory: Locator;
    private readonly productPrice: Locator;
    private readonly productAvailability: Locator;
    private readonly productCondition: Locator;
    private readonly productBrand: Locator;
    private readonly viewFirstProductBtn: Locator;
    private readonly productList: Locator;
    private readonly searchProductTextBox: Locator;
    private readonly searchProductBtn: Locator;
    private readonly productQuantityInput: Locator;
    private readonly addToCartBtn: Locator;
    

    constructor(page: any) {
        super();
        this.page = page;
        this.productsTab = page.getByRole('link', { name: ' Products' });
        this.productsPageHeader = page.getByRole('heading', { name: 'All Products' })
        this.viewFirstProductBtn = page.getByRole('link', { name: ' View Product' }).first();
        this.productName = page.locator('.newarrival + h2');
        this.productCategory = page.locator('.newarrival ~ p').first();
        this.productPrice = page.getByText('Rs.');
        this.productAvailability = page.getByText('Availability: In Stock');
        this.productCondition = page.getByText('Condition: New');
        this.productBrand = page.getByText('Brand: Polo');
        this.productList = page.locator('.single-products');
        this.searchProductTextBox = page.getByRole('textbox', { name: 'Search Product' })
        this.searchProductBtn = page.getByRole('button', { name: '' })
        this.productQuantityInput = page.locator('#quantity');
        this.addToCartBtn = page.getByRole('button', { name: ' Add to cart' })
    }
    //Create instance of ProductsPage
    static async create(page: Page): Promise<ProductsPage> {
        return new ProductsPage(page);
    }
    //Navigate to products page
    async verifyAllProductsPage(): Promise<string> {
        return await this.productsPageHeader.textContent() as string;
    }
    async verifyProductListCount(): Promise<number> {
        let productCount: number = await this.productList.count();
        console.log("Product count in ProductsPage: " + productCount);
        return productCount;
    }
    //View first product
    async viewFirstProduct(): Promise<void> {
        await this.viewFirstProductBtn.click();
    }
    //Verify product details
    async verifyProductDetails(): Promise<boolean> {
        try {
            if(await this.productName.isVisible() && await this.productCategory.isVisible() && await this.productPrice.isVisible() && await this.productAvailability.isVisible() && await this.productCondition.isVisible() && await this.productBrand.isVisible()) {
                return true;
            }
            return false;
        } catch (error) {
            console.log("Product details are not visible");
            return false;
        }
    }
    //Navigate to products page
    async navigateToProductsPage(): Promise<void> {
        await this.productsTab.click();
    }
    async searchProduct(productName: string): Promise<void> {
        await this.searchProductTextBox.fill(productName);
        await this.searchProductBtn.click();
    }
    //Update quantity
    async updateQuantity(quantity: number): Promise<number> {
        await this.productQuantityInput.fill(quantity.toString());
        return quantity;
    }
    //Add to cart
    async addToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }
}