Feature: automationexercise application products page functionality

    @VerifyProductsPage_TC001 @Regression
    Scenario: Verify All Products and product detail page
        Given User Visits HomePage
        When User Observes HomePage Title
        When User navigates to Products tab
        Then User should be redirected to All Products page
        Then User verifies product list
        Then User clicks on first product
        Then User landed to product detail page
        Then User verifies product name, category, price, availability, condition, brand
    
    @SearchProducts_TC002 @Regression
    Scenario: Verify Search Products functionality
        Given User Visits HomePage
        When User Observes HomePage Title
        When User navigates to Products tab
        Then User should be redirected to All Products page
        Then User search for product "Blue Top"
        Then User clicks on first product
        Then User landed to product detail page
        Then User verifies product name, category, price, availability, condition, brand