export interface CartPageOperations {
    navigateToCartPage(): Promise<void>;
    getCartPageTitle(): Promise<string|null>;
    addToCartFirstProduct(): Promise<void>;
    addToCartSecondProduct(): Promise<void>;
    clickOnContinueShopping(): Promise<void>;
    navigateToCartPage(): Promise<void>;
    verifyAllProductsAddedToCart(): Promise<boolean>;
    verifyPriceQuantityAndTotalPrice(): Promise<boolean|null>;
    verifyProductQuantityInShoppingCart(quantity: number): Promise<number>;
}
