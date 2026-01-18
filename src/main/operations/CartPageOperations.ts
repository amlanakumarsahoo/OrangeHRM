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
    clickOnProceedToCheckout(): Promise<void>;
    clickOnRegisterLogin(): Promise<void>;
    doVerifyShippingAddress(): Promise<void>;
    doVerifyBillingAddress(): Promise<void>;
    doReviewYourOrder(): Promise<void>;
    enterDescription(): Promise<void>;
    buttonClickPlaceOrder(): Promise<void>;
}
