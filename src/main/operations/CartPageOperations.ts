export interface CartPageOperations {
    navigateToCartPage(): Promise<void>;
    getCartPageTitle(): Promise<string|null>;
}
